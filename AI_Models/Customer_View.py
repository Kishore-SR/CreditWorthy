import streamlit as st
import pandas as pd
import numpy as np
import json
import plotly.express as px
import plotly.graph_objects as go
from datetime import datetime
import re

def clean_date(date_str):
    """Clean date string by removing INB suffix if present"""
    return re.sub(r'INB$', '', date_str)

def prepare_transaction_data(transactions):
    df = pd.DataFrame(transactions)
    
    # Clean date strings and convert to datetime
    df['date'] = df['date'].apply(clean_date)
    df['date'] = pd.to_datetime(df['date'], format='%d-%m-%y')
    df['month'] = df['date'].dt.month
    df['day_of_week'] = df['date'].dt.dayofweek
    
    # Convert amount columns to float
    df['credit'] = pd.to_numeric(df['credit'], errors='coerce').fillna(0)
    df['debit'] = pd.to_numeric(df['debit'], errors='coerce').fillna(0)
    df['balance'] = pd.to_numeric(df['balance'], errors='coerce').fillna(0)
    
    return df

def categorize_nano_entrepreneur_transactions(description):
    """Enhanced transaction categorization for nano-entrepreneurs"""
    categories = {
        'BUSINESS_INCOME': ['SALARY', 'INVESTMENT', 'BONUS', 'RETURNS', 'CREDIT'],
        'BUSINESS_EXPENSE': ['UTILITY', 'BILL', 'SHOPPING', 'STORE'],
        'PERSONAL_EXPENSE': ['COFFEE', 'FOOD', 'BEVERAGES'],
        'TRANSFER': ['RENT', 'TRANSFER', 'REFUND'],
        'OTHERS': []
    }
    
    description = str(description).upper()
    for category, keywords in categories.items():
        if any(keyword in description for keyword in keywords):
            return category
    return 'OTHERS'

def calculate_financial_metrics(df, summary_data):
    metrics = {}
    
    # Basic transaction metrics
    metrics['total_transactions'] = len(df)
    metrics['total_credits'] = df['credit'].sum()
    metrics['total_debits'] = df['debit'].sum()
    metrics['net_cashflow'] = metrics['total_credits'] - metrics['total_debits']
    
    # Balance metrics
    metrics['opening_balance'] = float(summary_data.get('opening_balance', 0))
    metrics['closing_balance'] = float(summary_data.get('closing_balance', 0))
    metrics['avg_balance'] = df['balance'].mean()
    metrics['balance_volatility'] = df['balance'].std()
    
    # Transaction patterns
    metrics['avg_transaction_size'] = df['debit'][df['debit'] > 0].mean()
    metrics['transaction_frequency'] = len(df) / 30  # transactions per day
    
    # Credit patterns
    credit_txns = len(df[df['credit'] > 0])
    metrics['credit_frequency'] = credit_txns / max(len(df), 1)
    metrics['avg_credit_amount'] = df[df['credit'] > 0]['credit'].mean() if credit_txns > 0 else 0
    
    return metrics

def calculate_nano_entrepreneur_score(metrics):
    """
    Custom scoring for nano-entrepreneurs considering unique financial patterns
    """
    # Income Stability (40 points)
    income_stability = min(
        metrics['credit_frequency'] * 20 +  # Frequency of income
        (metrics['avg_credit_amount'] > 10000) * 20  # Consistent income threshold
    , 40)
    
    # Business Resilience (30 points)
    business_resilience = min(
        (metrics['net_cashflow'] > 0) * 20 +  # Positive cash flow
        (metrics['balance_volatility'] < metrics['avg_balance'] * 0.3) * 10  # Low balance fluctuation
    , 30)
    
    # Transaction Discipline (20 points)
    transaction_discipline = min(
        (metrics['transaction_frequency'] > 0.5) * 10 +  # Regular transactions
        (metrics['avg_transaction_size'] < metrics['avg_credit_amount'] * 0.5) * 10  # Controlled spending
    , 20)
    
    # Growth Potential (10 points)
    growth_potential = min(
        (metrics['closing_balance'] > metrics['opening_balance']) * 5 +
        (metrics['total_credits'] > metrics['total_debits']) * 5
    , 10)
    
    # Total Nano-Entrepreneur Score
    nano_score = income_stability + business_resilience + transaction_discipline + growth_potential
    
    return {
        'score': min(max(nano_score, 0), 100),
        'breakdown': {
            'Income Stability': income_stability,
            'Business Resilience': business_resilience,
            'Transaction Discipline': transaction_discipline,
            'Growth Potential': growth_potential
        }
    }

def main():
    st.set_page_config(page_title="Nano Entrepreneur Financial Platform", layout="wide")
    st.title("Nano Entrepreneur Financial Empowerment Platform")
    
    uploaded_file = st.file_uploader("Upload Bank Statement", type=['json'])
    
    if uploaded_file is not None:
        try:
            bank_data = json.load(uploaded_file)
            
            # Process transactions
            df = prepare_transaction_data(bank_data['transactions'])
            df['category'] = df['description'].apply(categorize_nano_entrepreneur_transactions)
            
            # Customer Information
            st.header("Entrepreneur Profile")
            col1, col2 = st.columns(2)
            with col1:
                st.write("Name:", bank_data['personal_info'].get('customer_id', 'N/A'))
                st.write("Mobile:", bank_data['personal_info'].get('mobile', 'N/A'))
                st.write("KYC Status:", bank_data['personal_info'].get('kyc_status', 'N/A'))
            
            # Calculate financial metrics
            metrics = calculate_financial_metrics(df, bank_data['summary'])
            
            # Nano Entrepreneur Score
            nano_score = calculate_nano_entrepreneur_score(metrics)
            
            # Loan Recommendation Section
            st.header("Financial Health & Loan Recommendation")
            col1, col2 = st.columns(2)
            with col1:
                st.metric("Nano Entrepreneur Score", f"{nano_score['score']:.2f}/100")
                st.write("Score Breakdown:")
                for category, score in nano_score['breakdown'].items():
                    st.progress(score/40, text=f"{category}: {score:.2f}")
            
            with col2:
                # Loan Recommendation Logic
                if nano_score['score'] > 80:
                    st.success("🌟 High Potential Loan Recommendation")
                    st.write("Eligible for Priority Loan")
                    st.write("Recommended Loan Amount: Up to ₹5,00,000")
                elif nano_score['score'] > 60:
                    st.warning("🚀 Moderate Potential Loan")
                    st.write("Eligible for Business Growth Loan")
                    st.write("Recommended Loan Amount: Up to ₹2,50,000")
                else:
                    st.error("⚠️ Limited Loan Options")
                    st.write("Consider Building Financial History")
                    st.write("Recommended: Microfinance or Secured Loan")
            
            # Transaction Analysis
            st.header("Transaction Insights")
            
            # Detailed Transactions
            # Summary Section
            st.header("Account Summary")
            col1, col2, col3, col4 = st.columns(4)
            with col1:
                st.metric("Opening Balance", 
                         f"₹{float(bank_data['summary']['opening_balance']):,.2f}")
            with col2:
                st.metric("Closing Balance", 
                         f"₹{float(bank_data['summary']['closing_balance']):,.2f}")
            with col3:
                st.metric("Total Credits", f"₹{df['credit'].sum():,.2f}")
            with col4:
                st.metric("Total Debits", f"₹{df['debit'].sum():,.2f}")

            col1, col2, col3 = st.columns([2, 2, 1])
            with col1:
                # st.header("Hello There")
                # Loan Recommendation Logic
                st.header(" ")
                if nano_score['score'] > 80:
                    st.success("Congratulations for being Eligible for Priority Loan 🎊")
                    st.header("An Agent will reach out to you in shortly")
                elif nano_score['score'] > 60:
                    st.warning("Congratulations for being Eligible for Simple Priority Loan 🎊")
                    st.header("An Agent will reach out to you in shortly 🚀")
                else:
                    st.header("Limited Loan Options")
                    st.header("But Fear not")
                    st.write("You can improve your credit Score")
            with col3:
                st.header(" ")
                st.warning("For further Queries Contact: +91 8979685745 ")
                st.warning(" Email: support@creditworthy.com")

            
            
        except Exception as e:
            st.error(f"Error processing file: {str(e)}")

if __name__ == "__main__":
    main()
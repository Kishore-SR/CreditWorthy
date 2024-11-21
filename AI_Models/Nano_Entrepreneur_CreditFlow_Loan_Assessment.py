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
    return re.sub(r'INB$', '', str(date_str))

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

def categorize_transactions(description):
    """Enhanced transaction categorization"""
    description = str(description).upper()
    categories = {
        'BUSINESS_INCOME': ['SALARY', 'INVESTMENT', 'BONUS', 'RETURNS', 'CREDIT'],
        'BUSINESS_EXPENSE': ['UTILITY', 'BILL', 'SHOPPING', 'STORE'],
        'PERSONAL_EXPENSE': ['COFFEE', 'FOOD', 'BEVERAGES'],
        'TRANSFER': ['RENT', 'TRANSFER', 'REFUND'],
        'LOAN_TRANSACTION': ['LOAN', 'REPAYMENT'],
        'OTHERS': []
    }
    
    for category, keywords in categories.items():
        if any(keyword in description for keyword in keywords):
            return category
    return 'OTHERS'

def detect_loan_transactions(df):
    """
    Detect and analyze potential loan transactions
    
    Returns:
    dict: Comprehensive loan transaction insights
    """
    # Identify potential loan receipt and repayment transactions
    loan_receipt_txns = df[df['description'].str.contains('Loan', case=False, na=False) & (df['credit'] > 0)]
    loan_repayment_txns = df[df['description'].str.contains('Repayment', case=False, na=False) & (df['debit'] > 0)]
    
    # If no loan transactions found, return None
    if loan_receipt_txns.empty or loan_repayment_txns.empty:
        return None
    
    # Calculate loan details
    loan_insights = {
        'total_loan_amount': loan_receipt_txns['credit'].sum(),
        'total_repaid': loan_repayment_txns['debit'].sum(),
        'loan_receipt_dates': loan_receipt_txns['date'].tolist(),
        'repayment_dates': loan_repayment_txns['date'].tolist(),
        'repayment_count': len(loan_repayment_txns),
        'repayment_amounts': loan_repayment_txns['debit'].tolist(),
        'repayment_percentage': (loan_repayment_txns['debit'].sum() / loan_receipt_txns['credit'].sum()) * 100,
        'interest_rate' : ((loan_repayment_txns['debit'].sum() / loan_receipt_txns['credit'].sum()) - 1) * 100
    }
    
    return loan_insights

def calculate_financial_metrics(df, summary_data):
    """Calculate comprehensive financial metrics"""
    metrics = {
        'total_transactions': len(df),
        'total_credits': df['credit'].sum(),
        'total_debits': df['debit'].sum(),
        'net_cashflow': df['credit'].sum() - df['debit'].sum(),
        'opening_balance': float(summary_data.get('opening_balance', 0)),
        'closing_balance': float(summary_data.get('closing_balance', 0)),
        'avg_balance': df['balance'].mean(),
        'balance_volatility': df['balance'].std(),
        'avg_monthly_income': df[df['category'] == 'BUSINESS_INCOME']['credit'].sum(),
        'avg_monthly_expense': df[df['category'].isin(['BUSINESS_EXPENSE', 'PERSONAL_EXPENSE'])]['debit'].sum()
    }
    
    return metrics

def calculate_loan_worthiness_score(metrics, loan_insights=None):
    """
    Calculate a comprehensive loan worthiness score
    
    Parameters:
    - metrics: Financial metrics dictionary
    - loan_insights: Optional loan transaction insights
    
    Returns:
    dict: Loan worthiness score with breakdown
    """
    # Base score components
    income_stability = min(
        (metrics['avg_monthly_income'] > 20000) * 0.3 +  # Consistent income
        (metrics['net_cashflow'] > 0) * 0.2
    , 0.5)
    
    expense_management = min(
        (metrics['total_debits'] < metrics['total_credits']) * 0.2 +  # Controlled spending
        (metrics['balance_volatility'] < metrics['avg_balance'] * 0.3) * 0.1  # Low balance fluctuation
    , 0.3)
    
    # Loan repayment history (if available)
    loan_reliability = 0
    if loan_insights:
        loan_reliability = min(
            (loan_insights['repayment_percentage'] > 80) * 0.15 +  # High repayment percentage
            (loan_insights['repayment_count'] > 3) * 0.05  # Multiple repayments
        , 0.2)
    
    # Growth potential
    growth_potential = min(
        (metrics['closing_balance'] > metrics['opening_balance']) * 0.1 +
        (metrics['net_cashflow'] > 0) * 0.1
    , 0.2)
    
    # Calculate total score
    total_score = income_stability + expense_management + loan_reliability + growth_potential
    
    return {
        'score': min(max(total_score * 100, 0), 100),
        'breakdown': {
            'Income Stability': income_stability * 100,
            'Expense Management': expense_management * 100,
            'Loan Reliability': loan_reliability * 100,
            'Growth Potential': growth_potential * 100
        }
    }

def main():
    st.set_page_config(page_title="💼 Nano Entrepreneur CreditFlow Loan Assessment", layout="wide")
    st.title("💼 Nano Entrepreneur CreditFlow Loan Assessment")
    
    uploaded_file = st.file_uploader("Upload Bank Statement", type=['json'])
    
    if uploaded_file is not None:
        try:
            # Load and process bank data
            bank_data = json.load(uploaded_file)
            
            # Prepare transaction data
            df = prepare_transaction_data(bank_data['transactions'])
            df['category'] = df['description'].apply(categorize_transactions)
            
            # Detect loan transactions
            loan_insights = detect_loan_transactions(df)
            
            # Calculate financial metrics
            metrics = calculate_financial_metrics(df, bank_data.get('summary', {}))
            
            # Calculate loan worthiness score
            loan_score = calculate_loan_worthiness_score(metrics, loan_insights)
            
            # Display Entrepreneur Profile
            st.header("🧑‍💼 Entrepreneur Profile")
            col1, col2 = st.columns(2)
            with col1:
                st.write("Name:", bank_data['personal_info'].get('name', 'N/A'))
                st.write("Customer ID:", bank_data['personal_info'].get('customer_id', 'N/A'))
                st.write("Mobile:", bank_data['personal_info'].get('mobile', 'N/A'))
            
            with col2:
                st.write("KYC Status:", bank_data['personal_info'].get('kyc_status', 'N/A'))
                st.write("Account Number:", bank_data['account_info'].get('account_number', 'N/A'))
                st.write("Available Balance:", f"₹{bank_data['account_info'].get('available_balance', 0):,.2f}")
            
            # Loan Worthiness Section
            st.header("💰 Loan Worthiness Assessment")
            col1, col2 = st.columns(2)
            
            with col1:
                st.metric("Loan Worthiness Score", f"{loan_score['score']:.2f}/100")
                st.write("Score Breakdown:")
                for category, score in loan_score['breakdown'].items():
                    st.progress(score / 100, text=f"{category}: {score:.2f}")
            
            with col2:
                # Loan Recommendation Logic
                if loan_score['score'] > 80:
                    st.success("🌟 High Potential Loan Recommendation")
                    st.write("Eligible for Priority Business Loan")
                    st.write("Recommended Loan Amount: Up to ₹5,00,000")
                elif loan_score['score'] > 60:
                    st.warning("🚀 Moderate Potential Loan")
                    st.write("Eligible for Business Growth Loan")
                    st.write("Recommended Loan Amount: Up to ₹2,50,000")
                else:
                    st.error("⚠️ Limited Loan Options")
                    st.write("Consider Building Financial History")
                    st.write("Recommended: Microfinance or Secured Loan")
            
            # Loan Transaction Insights (if available)
            if loan_insights:
                st.header("💸 Loan Transaction Insights")
                col1, col2 = st.columns(2)
                
                with col1:
                    st.metric("Total Loan Amount Received", f"₹{loan_insights['total_loan_amount']:,.2f}")
                    st.metric("Total Repaid", f"₹{loan_insights['total_repaid']:,.2f}")
                    st.metric("Repayment Percentage", f"{loan_insights['repayment_percentage']:.2f}%")
                    st.metric("Interest Rate", f"{loan_insights['interest_rate']:.2f}%")
                
                with col2:
                    st.write("Loan Receipt Dates:")
                    st.write(loan_insights['loan_receipt_dates'])
                    st.write("Repayment Dates:")
                    st.write(loan_insights['repayment_dates'])
            
            # Transaction Analysis Section
            st.header("📊 Financial Transaction Analysis")
            fig = px.bar(
                df.groupby('category')['credit'].sum().reset_index(),
                x='category',
                y='credit',
                title='Income Sources Breakdown',
                labels={'credit': 'Income (₹)', 'category': 'Category'}
            )
            st.plotly_chart(fig, use_container_width=True)
            
        except Exception as e:
            st.error(f"Error processing file: {str(e)}")

if __name__ == "__main__":
    main()

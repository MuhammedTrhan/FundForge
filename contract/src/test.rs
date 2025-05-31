#![cfg(test)]

use super::*;
use soroban_sdk::{testutils::Address as _, Address, Env, String};

#[test]
fn test_create_company() {
    let env = Env::default();
    let contract_id = env.register_contract(None, CrowdfundingContract);
    let client = CrowdfundingContractClient::new(&env, &contract_id);
    
    let founder = Address::generate(&env);
    
    // Initialize contract
    client.initialize();
    
    // Create company
    let company_id = client.create_company(
        &founder,
        &String::from_str(&env, "Test Company"),
        &String::from_str(&env, "Test Description"),
        &1000000i128, // 1M target
        &String::from_str(&env, "teknoloji"),
    );
    
    assert_eq!(company_id, 1);
    
    // Get company
    let company = client.get_company(&company_id).unwrap();
    assert_eq!(company.name, String::from_str(&env, "Test Company"));
    assert_eq!(company.target_amount, 1000000i128);
    assert_eq!(company.current_amount, 0i128);
    assert_eq!(company.founder, founder);
    assert!(company.is_active);
}

#[test]
fn test_invest() {
    let env = Env::default();
    let contract_id = env.register_contract(None, CrowdfundingContract);
    let client = CrowdfundingContractClient::new(&env, &contract_id);
    
    let founder = Address::generate(&env);
    let investor = Address::generate(&env);
    
    // Initialize contract
    client.initialize();
    
    // Create company
    let company_id = client.create_company(
        &founder,
        &String::from_str(&env, "Test Company"),
        &String::from_str(&env, "Test Description"),
        &1000000i128,
        &String::from_str(&env, "teknoloji"),
    );
    
    // Make investment
    client.invest(&investor, &company_id, &50000i128);
    
    // Check company updated
    let company = client.get_company(&company_id).unwrap();
    assert_eq!(company.current_amount, 50000i128);
    assert!(company.is_active);
    
    // Check investor investment
    let investment_amount = client.get_investor_investment(&company_id, &investor);
    assert_eq!(investment_amount, 50000i128);
}

#[test]
fn test_funding_completion() {
    let env = Env::default();
    let contract_id = env.register_contract(None, CrowdfundingContract);
    let client = CrowdfundingContractClient::new(&env, &contract_id);
    
    let founder = Address::generate(&env);
    let investor = Address::generate(&env);
    
    // Initialize contract
    client.initialize();
    
    // Create company with small target
    let company_id = client.create_company(
        &founder,
        &String::from_str(&env, "Test Company"),
        &String::from_str(&env, "Test Description"),
        &100000i128, // 100K target
        &String::from_str(&env, "teknoloji"),
    );
    
    // Make investment that reaches target
    client.invest(&investor, &company_id, &100000i128);
    
    // Check company is now inactive
    let company = client.get_company(&company_id).unwrap();
    assert_eq!(company.current_amount, 100000i128);
    assert!(!company.is_active); // Should be inactive now
    
    // Check funding completion
    assert!(client.is_funding_completed(&company_id));
    
    // Check progress is 100%
    let progress = client.get_funding_progress(&company_id);
    assert_eq!(progress, 10000); // 100% * 100
}

#[test]
#[should_panic(expected = "Investment exceeds target amount")]
fn test_investment_exceeds_target() {
    let env = Env::default();
    let contract_id = env.register_contract(None, CrowdfundingContract);
    let client = CrowdfundingContractClient::new(&env, &contract_id);
    
    let founder = Address::generate(&env);
    let investor = Address::generate(&env);
    
    // Initialize contract
    client.initialize();
    
    // Create company
    let company_id = client.create_company(
        &founder,
        &String::from_str(&env, "Test Company"),
        &String::from_str(&env, "Test Description"),
        &100000i128,
        &String::from_str(&env, "teknoloji"),
    );
    
    // Try to invest more than target
    client.invest(&investor, &company_id, &150000i128);
}

#[test]
#[should_panic(expected = "Investment amount must be positive")]
fn test_negative_investment() {
    let env = Env::default();
    let contract_id = env.register_contract(None, CrowdfundingContract);
    let client = CrowdfundingContractClient::new(&env, &contract_id);
    
    let founder = Address::generate(&env);
    let investor = Address::generate(&env);
    
    // Initialize contract
    client.initialize();
    
    // Create company
    let company_id = client.create_company(
        &founder,
        &String::from_str(&env, "Test Company"),
        &String::from_str(&env, "Test Description"),
        &100000i128,
        &String::from_str(&env, "teknoloji"),
    );
    
    // Try to invest negative amount
    client.invest(&investor, &company_id, &-1000i128);
}

#[test]
fn test_multiple_investors() {
    let env = Env::default();
    let contract_id = env.register_contract(None, CrowdfundingContract);
    let client = CrowdfundingContractClient::new(&env, &contract_id);
    
    let founder = Address::generate(&env);
    let investor1 = Address::generate(&env);
    let investor2 = Address::generate(&env);
    
    // Initialize contract
    client.initialize();
    
    // Create company
    let company_id = client.create_company(
        &founder,
        &String::from_str(&env, "Test Company"),
        &String::from_str(&env, "Test Description"),
        &200000i128,
        &String::from_str(&env, "teknoloji"),
    );
    
    // Multiple investments
    client.invest(&investor1, &company_id, &50000i128);
    client.invest(&investor2, &company_id, &75000i128);
    client.invest(&investor1, &company_id, &25000i128); // Additional investment
    
    // Check total
    let company = client.get_company(&company_id).unwrap();
    assert_eq!(company.current_amount, 150000i128);
    
    // Check individual investments
    assert_eq!(client.get_investor_investment(&company_id, &investor1), 75000i128);
    assert_eq!(client.get_investor_investment(&company_id, &investor2), 75000i128);
}
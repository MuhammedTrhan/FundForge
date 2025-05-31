#![no_std]
use soroban_sdk::{
    contract, contractimpl, contracttype, symbol_short, vec, Address, Env, Map, Symbol, Vec, String,
};

// Data Types
#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct Company {
    pub id: u64,
    pub name: String,
    pub description: String,
    pub target_amount: i128,
    pub current_amount: i128,
    pub founder: Address,
    pub is_active: bool,
    pub category: String,
}

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct Investment {
    pub investor: Address,
    pub company_id: u64,
    pub amount: i128,
    pub timestamp: u64,
}

// Storage Keys
const COMPANIES: Symbol = symbol_short!("COMPANIES");
const COMPANY_COUNT: Symbol = symbol_short!("COMP_CNT");
const INVESTMENTS: Symbol = symbol_short!("INVESTS");
const COMPANY_INVESTORS: Symbol = symbol_short!("COMP_INV");

#[contract]
pub struct CrowdfundingContract;

#[contractimpl]
impl CrowdfundingContract {
    /// Initialize the contract
    pub fn initialize(env: Env) {
        env.storage().instance().set(&COMPANY_COUNT, &0u64);
    }

    /// Create a new company for funding
    pub fn create_company(
        env: Env,
        founder: Address,
        name: String,
        description: String,
        target_amount: i128,
        category: String,
    ) -> u64 {
        founder.require_auth();

        // Get and increment company count
        let mut company_count: u64 = env.storage().instance().get(&COMPANY_COUNT).unwrap_or(0);
        company_count += 1;

        // Create new company
        let company = Company {
            id: company_count,
            name,
            description,
            target_amount,
            current_amount: 0,
            founder,
            is_active: true,
            category,
        };

        // Store company
        let mut companies: Map<u64, Company> = env
            .storage()
            .instance()
            .get(&COMPANIES)
            .unwrap_or(Map::new(&env));
        
        companies.set(company_count, company);
        env.storage().instance().set(&COMPANIES, &companies);
        env.storage().instance().set(&COMPANY_COUNT, &company_count);

        company_count
    }

    /// Make an investment to a company
    pub fn invest(env: Env, investor: Address, company_id: u64, amount: i128) -> bool {
        investor.require_auth();

        // Validate amount
        if amount <= 0 {
            panic!("Investment amount must be positive");
        }

        // Get companies
        let mut companies: Map<u64, Company> = env
            .storage()
            .instance()
            .get(&COMPANIES)
            .unwrap_or(Map::new(&env));

        // Get company
        let mut company = companies.get(company_id).unwrap_or_else(|| {
            panic!("Company not found");
        });

        // Check if company is active
        if !company.is_active {
            panic!("Company is not active");
        }

        // Check if investment exceeds target
        if company.current_amount + amount > company.target_amount {
            panic!("Investment exceeds target amount");
        }

        // Update company current amount
        company.current_amount += amount;
        
        // Check if target reached
        if company.current_amount >= company.target_amount {
            company.is_active = false; // Close funding
        }

        companies.set(company_id, company.clone());
        env.storage().instance().set(&COMPANIES, &companies);

        // Store investment record
        let investment = Investment {
            investor: investor.clone(),
            company_id,
            amount,
            timestamp: env.ledger().timestamp(),
        };

        let mut investments: Vec<Investment> = env
            .storage()
            .instance()
            .get(&INVESTMENTS)
            .unwrap_or(vec![&env]);
        
        investments.push_back(investment);
        env.storage().instance().set(&INVESTMENTS, &investments);

        // Store investor for company
        let investor_key = (company_id, investor.clone());
        let current_investment: i128 = env
            .storage()
            .instance()
            .get(&(COMPANY_INVESTORS, investor_key.clone()))
            .unwrap_or(0);
        
        env.storage().instance().set(
            &(COMPANY_INVESTORS, investor_key),
            &(current_investment + amount),
        );

        true
    }

    /// Get company information
    pub fn get_company(env: Env, company_id: u64) -> Option<Company> {
        let companies: Map<u64, Company> = env
            .storage()
            .instance()
            .get(&COMPANIES)
            .unwrap_or(Map::new(&env));
        
        companies.get(company_id)
    }

    /// Get all companies
    pub fn get_all_companies(env: Env) -> Vec<Company> {
        let companies: Map<u64, Company> = env
            .storage()
            .instance()
            .get(&COMPANIES)
            .unwrap_or(Map::new(&env));
        
        let mut result = vec![&env];
        let company_count: u64 = env.storage().instance().get(&COMPANY_COUNT).unwrap_or(0);
        
        for i in 1..=company_count {
            if let Some(company) = companies.get(i) {
                result.push_back(company);
            }
        }
        
        result
    }

    /// Get companies by category
    pub fn get_companies_by_category(env: Env, category: String) -> Vec<Company> {
        let companies: Map<u64, Company> = env
            .storage()
            .instance()
            .get(&COMPANIES)
            .unwrap_or(Map::new(&env));
        
        let mut result = vec![&env];
        let company_count: u64 = env.storage().instance().get(&COMPANY_COUNT).unwrap_or(0);
        
        for i in 1..=company_count {
            if let Some(company) = companies.get(i) {
                if company.category == category {
                    result.push_back(company);
                }
            }
        }
        
        result
    }

    /// Get investor's investment in a specific company
    pub fn get_investor_investment(env: Env, company_id: u64, investor: Address) -> i128 {
        let investor_key = (company_id, investor);
        env.storage()
            .instance()
            .get(&(COMPANY_INVESTORS, investor_key))
            .unwrap_or(0)
    }

    /// Get all investments for a company
    pub fn get_company_investments(env: Env, company_id: u64) -> Vec<Investment> {
        let investments: Vec<Investment> = env
            .storage()
            .instance()
            .get(&INVESTMENTS)
            .unwrap_or(vec![&env]);
        
        let mut result = vec![&env];
        
        for investment in investments.iter() {
            if investment.company_id == company_id {
                result.push_back(investment);
            }
        }
        
        result
    }

    /// Get all investments by an investor
    pub fn get_investor_investments(env: Env, investor: Address) -> Vec<Investment> {
        let investments: Vec<Investment> = env
            .storage()
            .instance()
            .get(&INVESTMENTS)
            .unwrap_or(vec![&env]);
        
        let mut result = vec![&env];
        
        for investment in investments.iter() {
            if investment.investor == investor {
                result.push_back(investment);
            }
        }
        
        result
    }

    /// Get total number of companies
    pub fn get_company_count(env: Env) -> u64 {
        env.storage().instance().get(&COMPANY_COUNT).unwrap_or(0)
    }

    /// Check if company funding is completed
    pub fn is_funding_completed(env: Env, company_id: u64) -> bool {
        if let Some(company) = Self::get_company(env, company_id) {
            company.current_amount >= company.target_amount
        } else {
            false
        }
    }

    /// Get funding progress percentage (multiplied by 100)
    pub fn get_funding_progress(env: Env, company_id: u64) -> u32 {
        if let Some(company) = Self::get_company(env, company_id) {
            if company.target_amount > 0 {
                ((company.current_amount * 10000) / company.target_amount) as u32
            } else {
                0
            }
        } else {
            0
        }
    }

    /// Emergency function to deactivate a company (only founder can call)
    pub fn deactivate_company(env: Env, founder: Address, company_id: u64) -> bool {
        founder.require_auth();

        let mut companies: Map<u64, Company> = env
            .storage()
            .instance()
            .get(&COMPANIES)
            .unwrap_or(Map::new(&env));
        
        if let Some(mut company) = companies.get(company_id) {
            if company.founder != founder {
                panic!("Only founder can deactivate company");
            }
            
            company.is_active = false;
            companies.set(company_id, company);
            env.storage().instance().set(&COMPANIES, &companies);
            
            true
        } else {
            false
        }
    }
}
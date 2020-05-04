// constructor è il responsabile per instance, run ogni volta che inizializza la classe

// mettere la class declaration sempre al top
class UI {
    constructor() {
        this.incomeForm = document.getElementById("income-form");
        this.incomeInput = document.getElementById("income-input");
        this.incomeAmount = document.getElementById("income-amount");
        this.earningAmount = document.getElementById("earning-amount");
        this.expenseAmount = document.getElementById("expense-amount");
        this.balance = document.getElementById("balance");
        this.balanceAmount = document.getElementById("balance-amount");
        this.expenseForm = document.getElementById("expense-form");
        this.expenseInput = document.getElementById("expense-input");
        this.amountInput = document.getElementById("amount-input");
        this.expenseList = document.getElementById("expense-list");
        this.navName = document.querySelectorAll(".navbar-brand")
        this.itemList = [];
        this.itemID = 0;
        this.incomeList = [];
        this.incomeID = 0;

        
    }

    //METODI

    //metodo per cambiare nav link

    changeNavLink(element) {

        //change nav brand

        this.navName[0].innerHTML = event.target.innerHTML;

        //change link

        this.navName[0].href = event.target.parentElement.href ;

    }

    //metodo per submit income 
    submitIncomeForm(){
        const value = this.incomeInput.value;
        const earningValue = this.earningAmount.value;
        if (value ===''|| earningValue === '' || earningValue < 0){
            alert('Values cannot be empty or negative');
        } else{
            let earning = parseInt(earningValue);
            this.earningAmount.value = "";
            this.incomeInput.value = "";
            

            let  earnings = {
                id:this.incomeID,
                title: value,
                earning:earning,
            }
            this.incomeID++;
            this.incomeList.push(earnings);
            this.addIncome(earnings);
            this.showBalance();
        }
        
    }
    // metodosubmit expense form
    submitExpenseForm(){
        const expenseValue = this.expenseInput.value;
        const amountValue = this.amountInput.value;
    if(expenseValue === '' || amountValue === ''|| amountValue < 0 ){
        alert('Values cannot be empty or negative');
    }else {
        let amount = parseInt(amountValue);
        this.expenseInput.value = "";
        this.amountInput.value = "" ;

        let expense = {
            id:this.itemID,
            title: expenseValue,
            amount:amount,
        }
        this.itemID++;
        this.itemList.push(expense);
        this.addExpense(expense);
        this.showBalance();
        }    
    }
    // mostra balance
    showBalance(){
        const expense = this.totalExpense();
        const earnings = this.totalIncome();
        const total = earnings -expense;
        this.balanceAmount.textContent = total;
        if(total<0){
            this.balance.classList.remove('showGreen','showBlack');
            this.balance.classList.add('showRed')
        }
        else if(total>0){
            this.balance.classList.remove('showRed','showBlack');
            this.balance.classList.add('showGreen')
        }
        else if(total===0){
            this.balance.classList.remove('showRed','showGreen');
            this.balance.classList.add('showBlack')
        }
    }

    // aggiungere entrate e uscite

    addExpense(expense){
        const div = document.createElement('div');
        div.classList.add('expense');
        div.innerHTML = `
        <div class="expense-item d-flex justify-content-between align-items-baseline">
            <h6 class="expense-title mb-0 text-uppercase list-item">${expense.title}</h6>
            <h5 class="expense-amount mb-0 list-item">-${expense.amount} €</h5>
            <div class="expense-icons list-item">
            <a href="#here" class="edit-icon-expense mx-2" data-id="${expense.id}">
            <i class="fas fa-edit"></i>
            </a>
            <a href="#" class="delete-icon-expense" data-id="${expense.id}">
            <i class="fas fa-trash"></i>
            </a>
        </div>

        `;
        this.expenseList.appendChild(div);
    }
    addIncome(earnings){
        const div = document.createElement('div');
        div.classList.add('income');
        div.innerHTML = `
        <div class="expense-item d-flex justify-content-between align-items-baseline">
            <h6 class="expense-title mb-0 text-uppercase list-item">${earnings.title} </h6>
            <h5 class="income-amount mb-0 list-item">+${earnings.earning} €</h5>
            <div class="expense-icons list-item">
            <a href="#here" class="edit-icon-earnings mx-2" data-id="${earnings.id}">
            <i class="fas fa-edit"></i>
            </a>
            <a href="#" class="delete-icon-earnings" data-id="${earnings.id}">
            <i class="fas fa-trash"></i>
            </a>
        </div>

        `;
        this.expenseList.appendChild(div);
    }
    //qui creo metodo totalexpense

    totalExpense(){
        let exp = 0;
        if(this.itemList.length > 0){
            exp = this.itemList.reduce(function(acc,curr){
            acc += curr.amount;
                return acc;
            },0);
        }
        this.expenseAmount.textContent = exp;
        return exp;
    
    }
    // qui invece total income è qui da correggere

    totalIncome(){
        let inc = 0;
        if(this.incomeList.length > 0){
            inc = this.incomeList.reduce(function(acc,curr){
            acc += curr.earning;
                return acc;
            },0);
        }
        this.incomeAmount.textContent = inc;
        return inc;
    
    }
    // metodo edit
    
    editExpense(element){
        let idExpense = parseInt(element.dataset.id);
        let parent = element.parentElement.parentElement.parentElement; // mi dà il div della spesa
        // elimino dal dom
        this.expenseList.removeChild(parent);
        //elimino dal dom
        let expense = this.itemList.filter(function(item){
            return item.id === idExpense;
        })
        //mostra il valore
        this.expenseInput.value = expense[0].title;
        this.amountInput.value = expense[0].amount;
        //rimuovo dalla lista
        let tempExpenseList = this.itemList.filter(function(item){
            return item.id !== idExpense
        });
        this.itemList = tempExpenseList;
        this.showBalance() //deve essere eseguito lo show balance per l'update
    }

    
    editIncome(element){
        let idIncome = parseInt(element.dataset.id);
        let parent = element.parentElement.parentElement.parentElement;
        this.expenseList.removeChild(parent);
        let earnings = this.incomeList.filter(function(income){
            return income.id === idIncome;
        });
        this.incomeInput.value = earnings[0].title;
        this.earningAmount.value = earnings[0].earning;
        let tempIncomeList = this.incomeList.filter(function(income){
            return income.id !== idIncome
        });
        this.incomeList = tempIncomeList;
        this.showBalance();
    }

    // metodo delete
    deleteExpense(element){
        let idExpense = parseInt(element.dataset.id);
        let parent = element.parentElement.parentElement.parentElement;
        this.expenseList.removeChild(parent);
        let tempExpenseList = this.itemList.filter(function(item){
            return item.id !== idExpense
        });
        this.itemList = tempExpenseList;
        this.showBalance()
    }

    deleteIncome(element){
        let idIncome = parseInt(element.dataset.id);
        let parent = element.parentElement.parentElement.parentElement;
        this.expenseList.removeChild(parent);
        let tempIncomeList = this.incomeList.filter(function(income){
            return income.id !== idIncome
        });
        this.incomeList = tempIncomeList;
        this.showBalance();
    }
}

//creazione funzione eventlisteners


function eventListeners() {
    const incomeForm = document.getElementById('income-form');
    const expenseForm= document.getElementById('expense-form');
    const expenseList = document.getElementById('expense-list');

    const navLinks = document.querySelectorAll('.nav-link');

    //nuova instance della classe UI

    const ui = new UI();

    //navLink
    navLinks.forEach((navLink) => {
        navLink.addEventListener('click', function(event){
            event.preventDefault();
            ui.changeNavLink(event.target)
        })
    })
    
    // income form submit - evento quando submitto
    incomeForm.addEventListener('submit', function(event){
        event.preventDefault();
        ui.submitIncomeForm();
    });

    // expense form submit - evento quando submitto
    expenseForm.addEventListener('submit', function(event){
        event.preventDefault();
        ui.submitExpenseForm();

    });

    //  expense  - evento quando click sulle icone //contains controlla se l'elemento contiene la classe o meno
    expenseList.addEventListener('click', function(event) {
        if(event.target.parentElement.classList.contains('edit-icon-earnings')){
            ui.editIncome(event.target.parentElement);
        }else if (event.target.parentElement.classList.contains('edit-icon-expense')){
            ui.editExpense(event.target.parentElement);
        }else if (event.target.parentElement.classList.contains('delete-icon-expense')){
            ui.deleteExpense(event.target.parentElement);
        } else {
            ui.deleteIncome(event.target.parentElement);
        }
    });
}

document.addEventListener('DOMContentLoaded', function(){
    eventListeners();
});
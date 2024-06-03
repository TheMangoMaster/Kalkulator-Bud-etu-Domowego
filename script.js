document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('budget-form');
    const incomeInput = document.getElementById('income');
    const expenseCategory = document.getElementById('expense-category');
    const expenseAmount = document.getElementById('expense-amount');
    const addExpenseButton = document.getElementById('add-expense');
    const expenseItems = document.getElementById('expense-items');
    const balanceOutput = document.getElementById('balance');
    const statusOutput = document.getElementById('status');
    let expenses = [];

    addExpenseButton.addEventListener('click', () => {
        const category = expenseCategory.value;
        const amount = parseFloat(expenseAmount.value);
        
        if (!isNaN(amount) && amount > 0) {
            expenses.push({ category, amount });
            displayExpenses();
            expenseAmount.value = '';
        }
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const income = parseFloat(incomeInput.value);
        const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
        const balance = income - totalExpenses;

        balanceOutput.textContent = Twój bilans: ${balance.toFixed(2)} zł;

        if (balance > 0) {
            statusOutput.textContent = 'Masz nadwyżkę budżetową.';
            statusOutput.style.color = 'green';
        } else if (balance < 0) {
            statusOutput.textContent = 'Masz deficyt budżetowy.';
            statusOutput.style.color = 'red';
        } else {
            statusOutput.textContent = 'Twój budżet jest zrównoważony.';
            statusOutput.style.color = 'black';
        }
    });

    function displayExpenses() {
        expenseItems.innerHTML = '';

        expenses.forEach((expense, index) => {
            const li = document.createElement('li');
            li.textContent = ${expense.category}: ${expense.amount.toFixed(2)} zł;

            const removeButton = document.createElement('button');
            removeButton.textContent = 'Usuń';
            removeButton.style.marginLeft = '1rem';
            removeButton.addEventListener('click', () => {
                expenses.splice(index, 1);
                displayExpenses();
            });

            li.appendChild(removeButton);
            expenseItems.appendChild(li);
        });
    }
});
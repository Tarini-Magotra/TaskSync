document.addEventListener('DOMContentLoaded', function() {
    const homebutton = document.getElementById('home-icon');

    function appendToDisplay(value) {
        document.getElementById('display').value += value;
    }

    function clearDisplay() {
        document.getElementById('display').value = '';
    }

    function calculate() {
        let result;
        try {
            result = eval(document.getElementById('display').value);
            document.getElementById('display').value = result;
        } catch (error) {
            alert('Error in calculation.');
            clearDisplay();
        }
    }

    homebutton.addEventListener('click', function() {
        window.location.href = 'index.html'; // Replace with your homepage URL
    });
});

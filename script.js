const left = document.querySelector('.left');
const right = document.querySelector('.right');
const container = document.querySelector('.container');

left.addEventListener('mouseenter', () => container.classList.add('hover-left'));
left.addEventListener('mouseleave', () => container.classList.remove('hover-left'));
right.addEventListener('mouseenter', () => container.classList.add('hover-right'));
right.addEventListener('mouseleave', () => container.classList.remove('hover-right'));


document.addEventListener('DOMContentLoaded', () => {
    const weeklyCalendarBtn = document.getElementById('weekly-calendar-btn');
    const todoListBtn = document.getElementById('todo-list-btn');

    weeklyCalendarBtn.addEventListener('click', () => {
        window.location.href = 'weekly-index.html'; // Replace with your target URL
    });

    todoListBtn.addEventListener('click', () => {
        window.location.href = 'index-todo.html'; // Replace with your target URL
    });
});



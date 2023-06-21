export const showList = todos => 
    `Ваш список справ: \n\n${
        todos.map(todo => (todo.isCompleted ? '✅ ' : '❌ ') + todo.name + '\n\n')
        .join('')}`


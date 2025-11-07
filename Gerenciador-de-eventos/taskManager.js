import { EventEmitter } from 'events';

class TaskManager extends EventEmitter {
    constructor() {
        super();
        this.tasks = [];
        this.setupListeners();
    }

    setupListeners() {
        this.on('taskCreated', (taskName) => {
            const task = {
                nome: taskName,
                status: 'pendente',
                timeout: null
            };

            task.timeout = setTimeout(() => {
                task.status = 'concluída';
                this.emit('taskCompleted', taskName);
                console.log(`✅ Tarefa "${taskName}" foi concluída automaticamente!`);
            }, 30000);

            this.tasks.push(task);
            console.log(`📝 Tarefa "${taskName}" foi criada!`);
        });

        this.on('taskCompleted', (taskName) => {
            console.log(`🎉 Evento taskCompleted disparado para: "${taskName}"`);
        });

        this.on('taskCancelled', (taskName) => {
            const task = this.tasks.find(t => t.nome === taskName);

            if (task && task.status === 'pendente') {
                clearTimeout(task.timeout);
                task.status = 'cancelada';
                console.log(`❌ Tarefa "${taskName}" foi cancelada!`);
            }
        });
    }

    createTask(taskName) {
        this.emit('taskCreated', taskName);
    }

    cancelTask(taskName) {
        this.emit('taskCancelled', taskName);
    }

    listTasks() {
        console.log('\n📋 === LISTA DE TAREFAS ===');
        if (this.tasks.length === 0) {
            console.log('Nenhuma tarefa encontrada.');
        } else {
            this.tasks.forEach((task, index) => {
                const statusEmoji = {
                    'pendente': '⏳',
                    'concluída': '✅',
                    'cancelada': '❌'
                };
                console.log(`${index + 1}. ${task.nome} - Status: ${statusEmoji[task.status]} ${task.status}`);
            });
        }
        console.log('========================\n');
    }
}


const manager = new TaskManager();

console.log('🚀 Iniciando simulação...\n');

manager.createTask('Estudar Node.js');
manager.createTask('Fazer exercícios de EventEmitter');

setTimeout(() => {
    console.log('\n⏰ 10 segundos se passaram...');
    manager.cancelTask('Estudar Node.js');
}, 10000);

setTimeout(() => {
    console.log('\n⏰ 5 segundos se passaram...');
    manager.listTasks();
}, 5000);

setTimeout(() => {
    console.log('\n⏰ 15 segundos se passaram...');
    manager.listTasks();
}, 15000);

console.log('\n⏳ Aguardando eventos...\n');
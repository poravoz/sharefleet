import { Controller } from '@nestjs/common';
import { Hears, InjectBot, Message, On, Start, Update } from 'nestjs-telegraf';
import {Telegraf } from 'telegraf';
import { AppService } from '../app.service';
import { actionButtons } from './app.button';
import { showList } from './app.utils';
import { Context } from './context.interface';

const todos = [{
    id: 1,
    name: 'Buy goods',
    isCompleted: false
},
{
    id: 2,
    name: 'Go to Walk',
    isCompleted: false
},
{
    id: 3,
    name: 'Travel',
    isCompleted: true
},
]

@Update()
@Controller()
export class AppUpdate {
    constructor(
        @InjectBot() private readonly bot: Telegraf<Context>,
        private readonly appService: AppService
    ) {}

    @Start()
    async startCommand(ctx: Context) {
        await ctx.reply('Hello, World!')
        await ctx.reply('Що ти хочешь зробити?', actionButtons())
    }

    @Hears('🤙 Список справ')
    async listTask(ctx: Context) {
        await ctx.reply(showList(todos))
        
    }

    @Hears('✅ Завершити')
    async doneTask(ctx: Context) {
       await ctx.reply('Напишіть ID задачи: ')
       ctx.sessions.type = 'done'
        
    }

    @On('text')
    async getMessage(@Message('text') massage: string, ctx: Context) {
        if(!ctx.sessions.type) return
        if(ctx.sessions.type === 'done') {
            
        }
    }
}
import { Context as ContextTelegraf } from 'telegraf';

export interface Context extends ContextTelegraf {
    sessions: {
        type?: 'done' | 'edit' | 'remove'
    }

}
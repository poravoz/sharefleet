import { Markup } from 'telegraf'

export function actionButtons () {
    return Markup.keyboard(
        [
            Markup.button.callback('🤙 Список справ', 'list'),
            Markup.button.callback('📝 Редагування', 'edit'),
            Markup.button.callback('✅ Завершити', 'done'),
            Markup.button.callback('❌ Видалення', 'delete'),
        ],
        {
            columns: 2
        }
    )
}
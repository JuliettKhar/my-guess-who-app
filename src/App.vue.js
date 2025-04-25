/// <reference types="../node_modules/.vue-global-types/vue_3.5_0_0_0.d.ts" />
import { computed, onBeforeUnmount, ref, watch } from 'vue';
import CategorySelector from './components/CategorySelector.vue';
import ChatWindow from './components/ChatWindow.vue';
import QuickReplies from './components/QuickReplies.vue';
import { getBackgroundUrl } from '@/utils/getBackgroundUrl.ts';
import { systemPrompts } from '@/utils/systemPrompts.ts';
const enCategories = ['Anime Character', 'Real Person', 'Movie Character'];
const jpCategories = ['アニメキャラクター', '実在の人物', '映画のキャラクター'];
const category = ref('');
const lang = ref('en');
const input = ref('');
const messages = ref([]);
const isAnswerLoading = ref(false);
const categoriesByLang = computed(() => lang.value === 'en' ? enCategories : jpCategories);
const dynamicBg = computed(() => getBackgroundUrl(category.value));
const updateBg = () => document.documentElement.style.setProperty('--guess-bg-url', `url('${dynamicBg.value}')`);
const selectCategory = (c) => {
    category.value = c;
    messages.value = [{ role: 'system', content: systemPrompts[c][lang.value] }];
    fetchNextQuestion();
};
const quickReply = (text) => {
    messages.value.push({ role: 'user', content: text });
    scrollToMessage();
    fetchNextQuestion();
};
const sendMessage = () => {
    if (!input.value.trim())
        return;
    messages.value.push({ role: 'user', content: input.value });
    fetchNextQuestion();
    scrollToMessage();
    input.value = '';
};
const scrollToMessage = () => {
    setTimeout(() => {
        const currMessage = document.getElementById(`message-${messages.value.length - 1}`);
        currMessage?.scrollIntoView({ behavior: 'smooth' });
    }, 0);
};
const fetchNextQuestion = async () => {
    isAnswerLoading.value = true;
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`
        },
        body: JSON.stringify({
            model: 'gpt-4',
            messages: messages.value
        })
    });
    const data = await res.json();
    isAnswerLoading.value = false;
    messages.value.push({ role: 'assistant', content: data.choices[0].message.content });
    scrollToMessage();
};
const reset = () => {
    category.value = '';
    input.value = '';
    messages.value = [];
};
const stop = watch(category, () => {
    updateBg();
});
onBeforeUnmount(() => {
    stop();
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "guess-app" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "guess-app__header" },
    ...{ style: (!__VLS_ctx.category ? 'padding-bottom:20px' : 'padding-bottom:0') },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({
    ...{ class: "sm:text-sm md:text-3xl font-bold text-center text-indigo-700" },
});
(__VLS_ctx.lang === 'ja' ? '「だれでしょう？」' : 'Guess Who?');
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "flex justify-end" },
});
if (!__VLS_ctx.category) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.select, __VLS_intrinsicElements.select)({
        value: (__VLS_ctx.lang),
        ...{ class: "border border-gray-300 rounded-xl px-2 py-2 text-sm text-gray-500" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
        value: "en",
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
        value: "ja",
    });
}
if (!__VLS_ctx.category) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "guess-app__body" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
        ...{ class: "sm:text-sm text-center text-pink-600" },
    });
    (__VLS_ctx.lang === 'ja'
        ? 'カテゴリーを選んで、誰かを思い浮かべてください！私は当ててみます。'
        : 'Think of someone from the selected category — I’ll guess who it is!');
    /** @type {[typeof CategorySelector, ]} */ ;
    // @ts-ignore
    const __VLS_0 = __VLS_asFunctionalComponent(CategorySelector, new CategorySelector({
        ...{ 'onSelect': {} },
        categories: (__VLS_ctx.categoriesByLang),
        lang: (__VLS_ctx.lang),
    }));
    const __VLS_1 = __VLS_0({
        ...{ 'onSelect': {} },
        categories: (__VLS_ctx.categoriesByLang),
        lang: (__VLS_ctx.lang),
    }, ...__VLS_functionalComponentArgsRest(__VLS_0));
    let __VLS_3;
    let __VLS_4;
    let __VLS_5;
    const __VLS_6 = {
        onSelect: (__VLS_ctx.selectCategory)
    };
    var __VLS_2;
}
else {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "guess-app__body" },
        ...{ style: (!__VLS_ctx.category ? 'flex-direction: row' : 'flex-direction: column') },
    });
    /** @type {[typeof ChatWindow, ]} */ ;
    // @ts-ignore
    const __VLS_7 = __VLS_asFunctionalComponent(ChatWindow, new ChatWindow({
        messages: (__VLS_ctx.messages),
        loader: (__VLS_ctx.isAnswerLoading),
        lang: (__VLS_ctx.lang),
    }));
    const __VLS_8 = __VLS_7({
        messages: (__VLS_ctx.messages),
        loader: (__VLS_ctx.isAnswerLoading),
        lang: (__VLS_ctx.lang),
    }, ...__VLS_functionalComponentArgsRest(__VLS_7));
    /** @type {[typeof QuickReplies, ]} */ ;
    // @ts-ignore
    const __VLS_10 = __VLS_asFunctionalComponent(QuickReplies, new QuickReplies({
        ...{ 'onReply': {} },
        lang: (__VLS_ctx.lang),
    }));
    const __VLS_11 = __VLS_10({
        ...{ 'onReply': {} },
        lang: (__VLS_ctx.lang),
    }, ...__VLS_functionalComponentArgsRest(__VLS_10));
    let __VLS_13;
    let __VLS_14;
    let __VLS_15;
    const __VLS_16 = {
        onReply: (__VLS_ctx.quickReply)
    };
    var __VLS_12;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "flex gap-2" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
        ...{ onKeydown: (__VLS_ctx.sendMessage) },
        placeholder: (__VLS_ctx.lang === 'ja' ? '答えを入力してください…' : 'Type your answer...'),
        ...{ class: "flex-1 border border-gray-300 rounded-xl px-4 py-2" },
    });
    (__VLS_ctx.input);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (__VLS_ctx.sendMessage) },
        ...{ class: "bg-indigo-500 text-white rounded-xl px-4" },
    });
    (__VLS_ctx.lang === 'ja' ? '送信' : 'Send');
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (__VLS_ctx.reset) },
        ...{ class: "mt-4 text-sm text-gray-500 bg-gray-200" },
    });
    (__VLS_ctx.lang === 'ja' ? 'オーバー' : 'Over');
}
/** @type {__VLS_StyleScopedClasses['guess-app']} */ ;
/** @type {__VLS_StyleScopedClasses['guess-app__header']} */ ;
/** @type {__VLS_StyleScopedClasses['sm:text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['md:text-3xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-indigo-700']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-end']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-gray-300']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['px-2']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-500']} */ ;
/** @type {__VLS_StyleScopedClasses['guess-app__body']} */ ;
/** @type {__VLS_StyleScopedClasses['sm:text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-pink-600']} */ ;
/** @type {__VLS_StyleScopedClasses['guess-app__body']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-gray-300']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-indigo-500']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-500']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-gray-200']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            CategorySelector: CategorySelector,
            ChatWindow: ChatWindow,
            QuickReplies: QuickReplies,
            category: category,
            lang: lang,
            input: input,
            messages: messages,
            isAnswerLoading: isAnswerLoading,
            categoriesByLang: categoriesByLang,
            selectCategory: selectCategory,
            quickReply: quickReply,
            sendMessage: sendMessage,
            reset: reset,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */

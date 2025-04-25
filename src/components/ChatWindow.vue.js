/// <reference types="../../node_modules/.vue-global-types/vue_3.5_0_0_0.d.ts" />
import { toRefs } from 'vue';
import aiImg from '@/assets/ai-image.png';
import UserImg from '@/assets/user-image.jpeg';
import robotImg from '@/assets/robot.jpg';
const props = defineProps({ messages: Array, loader: Boolean, lang: String });
const { messages, loader, lang } = toRefs(props);
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "bg-white border border-gray-200 rounded-xl p-4 h-80 overflow-y-auto shadow-sm" },
});
for (const [msg, i] of __VLS_getVForSourceType((__VLS_ctx.messages))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        key: (i),
        ...{ class: "mb-2" },
        id: (`message-${i}`),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "message-wrapper" },
        ...{ class: (msg.role === 'assistant' ? 'text-indigo-600' : 'text-pink-600') },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.img)({
        src: (i === 0 ? __VLS_ctx.robotImg : msg.role === 'assistant' && i > 0 ? __VLS_ctx.aiImg : __VLS_ctx.UserImg),
        alt: "",
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
    (msg.content);
}
if (__VLS_ctx.loader) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
        ...{ class: "text-sm text-gray-500 mt-4 animate-pulse" },
    });
    (__VLS_ctx.lang === 'ja' ? '考え...' : 'Thinking...');
}
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-gray-200']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['p-4']} */ ;
/** @type {__VLS_StyleScopedClasses['h-80']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-y-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
/** @type {__VLS_StyleScopedClasses['message-wrapper']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-500']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-4']} */ ;
/** @type {__VLS_StyleScopedClasses['animate-pulse']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            aiImg: aiImg,
            UserImg: UserImg,
            robotImg: robotImg,
            messages: messages,
            loader: loader,
            lang: lang,
        };
    },
    props: { messages: Array, loader: Boolean, lang: String },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    props: { messages: Array, loader: Boolean, lang: String },
});
; /* PartiallyEnd: #4569/main.vue */

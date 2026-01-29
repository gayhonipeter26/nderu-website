import type { ComputedRef, Ref } from 'vue';
import { computed, ref } from 'vue';
import type { Appearance, ResolvedAppearance } from '@/types';

export type { Appearance, ResolvedAppearance };

export type UseAppearanceReturn = {
    appearance: Ref<Appearance>;
    resolvedAppearance: ComputedRef<ResolvedAppearance>;
    updateAppearance: (value: Appearance) => void;
};

export function updateTheme(_value: Appearance): void {
    if (typeof window === 'undefined') {
        return;
    }

    document.documentElement.classList.add('dark');
}


export function initializeTheme(): void {
    if (typeof window === 'undefined') {
        return;
    }

    updateTheme('dark');
}

const appearance = ref<Appearance>('dark');

export function useAppearance(): UseAppearanceReturn {
    const resolvedAppearance = computed<ResolvedAppearance>(() => 'dark');

    function updateAppearance(_value: Appearance) {
        // Theme is locked to dark
        appearance.value = 'dark';
        updateTheme('dark');
    }

    return {
        appearance,
        resolvedAppearance,
        updateAppearance,
    };
}

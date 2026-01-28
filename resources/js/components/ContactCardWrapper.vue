<script setup lang="tsx">
import { onMounted, onBeforeUnmount, ref, watch } from 'vue';
import React from 'react';
import { createRoot } from 'react-dom/client';
import type { Root } from 'react-dom/client';
import ContactCardDemo from './ui/contact-card-demo';
import PhotographyContactCardDemo from './ui/photography-contact-card-demo';
import BlogContactCardDemo from './ui/blog-contact-card-demo';
import NewsletterContactCardDemo from './ui/newsletter-contact-card-demo';
import SecureMessageGateway from './ui/secure-message-gateway';

const props = defineProps<{
  type?: 'default' | 'photography' | 'blog' | 'newsletter' | 'secure-gateway'
}>();

const container = ref<HTMLDivElement | null>(null);
let root: Root | null = null;

const renderComponent = () => {
  if (container.value) {
    if (root) root.unmount();
    root = createRoot(container.value);
    root.render(
      <React.StrictMode>
        {
          props.type === 'photography' ? <PhotographyContactCardDemo /> :
            props.type === 'blog' ? <BlogContactCardDemo /> :
              props.type === 'newsletter' ? <NewsletterContactCardDemo /> :
                props.type === 'secure-gateway' ? <SecureMessageGateway /> :
                  <ContactCardDemo />
        }      </React.StrictMode>
    );
  }
};

onMounted(renderComponent);

watch(() => props.type, renderComponent);

onBeforeUnmount(() => {
  if (root) {
    root.unmount();
    root = null;
  }
});
</script>

<template>
  <div ref="container" class="w-full"></div>
</template>

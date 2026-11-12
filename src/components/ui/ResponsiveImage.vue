<script setup lang="ts">
import { imageFallbackSrc, imageSrcSet, type SiteImage } from '@/data/images'

// Rellena siempre el contenedor del padre (object-fit: cover).
// Solo WebP: un único `<img>` con `srcset`; el navegador elige el ancho.
// El padre decide la proporción con `aspect-ratio` o con su altura.
// El texto alternativo llega ya traducido (`t('images.<id>')`).
const props = withDefaults(
  defineProps<{
    image: SiteImage
    alt: string
    /** Atributo `sizes`: el ancho que ocupará la imagen en pantalla. */
    sizes: string
    /** La imagen principal del primer pantallazo se carga sin esperar. */
    priority?: boolean
  }>(),
  { priority: false },
)
</script>

<template>
  <div class="responsive-image">
    <img
      :src="imageFallbackSrc(props.image)"
      :srcset="imageSrcSet(props.image)"
      :sizes="props.sizes"
      :alt="props.alt"
      :width="props.image.width"
      :height="props.image.height"
      :loading="props.priority ? 'eager' : 'lazy'"
      :fetchpriority="props.priority ? 'high' : 'auto'"
      decoding="async"
      :style="props.image.focus ? { objectPosition: props.image.focus } : undefined"
    >
  </div>
</template>

<style scoped lang="scss">
.responsive-image {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: var(--color-marfil-shade);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>

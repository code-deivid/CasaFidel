<script setup lang="ts">
import { imageFallbackSrc, imageSrcSet, type SiteImage } from '@/data/images'

// Rellena siempre el contenedor del padre (object-fit: cover).
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
    <picture>
      <source
        type="image/avif"
        :srcset="imageSrcSet(props.image, 'avif')"
        :sizes="props.sizes"
      >
      <source
        type="image/webp"
        :srcset="imageSrcSet(props.image, 'webp')"
        :sizes="props.sizes"
      >
      <img
        :src="imageFallbackSrc(props.image)"
        :alt="props.alt"
        :width="props.image.width"
        :height="props.image.height"
        :loading="props.priority ? 'eager' : 'lazy'"
        :fetchpriority="props.priority ? 'high' : 'auto'"
        decoding="async"
        :style="props.image.focus ? { objectPosition: props.image.focus } : undefined"
      >
    </picture>
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

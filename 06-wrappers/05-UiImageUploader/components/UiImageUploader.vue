<template>
  <div class="image-uploader">
    <label v-if="imageOrPreview" class="image-uploader__preview" :style="`--bg-url: url('${imageOrPreview}')`">
      <span class="image-uploader__text">Удалить изображение</span>
      <input type="none" class="image-uploader__input" @click="removeImage" />
    </label>
    <label
      v-else-if="isUploading"
      class="image-uploader__preview image-uploader__preview-loading"
      :style="`--bg-url: url('${image}')`"
    >
      <span class="image-uploader__text">Загрузка...</span>
      <input type="file" class="image-uploader__input" @click.prevent />
    </label>
    <label v-else class="image-uploader__preview">
      <span class="image-uploader__text">Загрузить изображение</span>
      <input
        v-bind="$attrs"
        :value="image"
        type="file"
        accept="image/*"
        class="image-uploader__input"
        @change="onFileChange"
      />
    </label>
  </div>
</template>

<script>
export default {
  name: 'UiImageUploader',

  inheritAttrs: false,

  props: {
    preview: {
      type: String,
    },
    uploader: {
      type: Function,
    },
  },

  emits: {
    remove: null,
    upload: null,
    select: null,
    error: null,
  },

  data() {
    return {
      image: null,
      isUploading: false,
    };
  },

  computed: {
    imageOrPreview() {
      return !this.isUploading && (this.preview || this.image);
    },
  },

  // watch: {
  //   image: {
  //     immediate: true,
  //     handler() {
  //       console.log(this.image);
  //     },
  //   },
  // },

  methods: {
    removeImage() {
      this.image = null;
      this.$emit('remove');
    },
    onFileChange(e) {
      const files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;

      const file = files[0];

      this.$emit('select', file);

      if (this.uploader) {
        this.isUploading = true;
        this.image = URL.createObjectURL(file);
        this.uploader(file).then(
          (result) => {
            this.isUploading = false;

            this.$emit('upload', result);
          },
          (error) => {
            this.isUploading = false;
            this.image = null;
            this.$emit('error', error);
          },
        );
      } else {
        this.image = URL.createObjectURL(file);
      }
    },
  },
};
</script>

<style scoped>
.image-uploader {
}

.image-uploader__input {
  opacity: 0;
  height: 0;
}

.image-uploader__preview {
  --bg-url: var(--default-cover);
  background-size: cover;
  background-position: center;
  background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), var(--bg-url);
  border: 2px solid var(--blue-light);
  border-radius: 8px;
  transition: 0.2s border-color;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 512px;
  height: 228px;
}

.image-uploader__text {
  color: var(--white);
  font-family: 'Nunito', sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
}

.image-uploader__preview:hover {
  border-color: var(--blue);
}

.image-uploader__preview.image-uploader__preview-loading {
  cursor: no-drop;
}
</style>

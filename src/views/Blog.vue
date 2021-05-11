<template>
  <div class="width-max-960 width-full margin-auto-horizontal padding-l">
    <div v-if="isLoading.posts === false" class="section width-full">
      <div class="section-header">
        <h2>Blog</h2>
      </div>
      <div v-if="Object.values(posts).length > 0" class="card card-list">
        <ul>
          <li v-for="post in Object.values(posts).reverse()" v-bind:key="post.id" class="width-full">
            <router-link v-bind:to="{ name: 'Post', params: { id: post.id } }" class="width-full flex-inline flex-flow-column align-start justify-start padding-s padding-xs-top padding-xs-bottom">
              <h3 class="ambigious-link" style="line-height: 1.125;">{{ post.title }}</h3>
              <small class="timestamp text-color-secondary">{{ formatTimestamp(post.date) }}</small>
            </router-link>
          </li>
        </ul>
      </div>
      <div v-else class="card">
        <div class="width-full align-center justify-center padding-xl text-align-center text-color-secondary">No posts</div>
      </div>
    </div>
    <div v-else class="card">
      <div class="width-full align-center justify-center padding-xl text-align-center text-color-secondary">Loading...</div>
    </div>
  </div>
</template>

<script>
import TimeAndDate from '@/utils/TimeAndDate.js';
import postManifest from '@/assets/post_manifest.json';

export default {
  name: 'Blog',
  data() {
    return {
      isLoading: {
        posts: true
      },
      posts: {}
    }
  },
  methods: {
    indexPosts: function () {
      this.isLoading.posts = true;
      if (postManifest) {
        postManifest.posts.forEach(post => {
          this.posts[post.id] = post;
        });
      }
      this.isLoading.posts = false;
    },
    formatTimestamp: function (timestamp) {
      return TimeAndDate.formatTimestamp(timestamp);
    }
  },
  mounted: function () {
    this.indexPosts();
  }
}
</script>

<style scoped>
a, a:hover {
  text-decoration: none !important;
}
</style>
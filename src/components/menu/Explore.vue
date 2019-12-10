<template>
  <v-container
    grid-list-xl
  >
  <!-- Card artikel -->
    <v-layout wrap>
      <v-flex xs12>
        <slot />
      </v-flex>

      <feed-card
        v-for="(article, i) in paginatedArticles"
        :key="article.title"
        :size="layout[i]"
        :value="article"
      />
    </v-layout>
<!-- Pagination -->
    <v-row align-center>
      <v-col cols="3">
        <v-btn
          v-if="page !== 1"
          class="ml-0"
          title="Previous page"
          small
          color="primary"
          v-bind="$attrs"
          v-on="$listeners"
          square
          @click="page--"
        >
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-col>

      <v-col
        cols="6"
        class="text-center subtitle-1"
      >
        PAGE {{ page }} OF {{ pages }}
      </v-col>

      <v-col
        cols="3"
        class="text-right"
      >
        <v-btn
          v-if="pages > 1 && page < pages"
          class="mr-0"
          title="Next page"
          small
          color="primary"
          v-bind="$attrs"
          v-on="$listeners"
          square
          @click="page++"
        >
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import {
    mapState
  } from 'vuex'

  export default {
    name: 'Feed',

    components: {
      FeedCard: () => import('@/components/home/FeedCard')
    },

    data: () => ({
      layout: [2, 2, 1, 2, 2, 3, 3, 3, 3, 3, 3],
      page: 1
    }),

    computed: {
      ...mapState(['articles']),
      pages () {
        return Math.ceil(this.articles.length / 11)
      },
      paginatedArticles () {
        const start = (this.page - 1) * 11
        const stop = this.page * 11

        return this.articles.slice(start, stop)
      }
    },

    watch: {
      page () {
        window.scrollTo(0, 0)
      }
    }
  }
</script>

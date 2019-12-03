<template>
  <div id="home">
    <Articles>
      <Banner />
    </Articles>

    <About />

    <Subscribe />

    <Footer />
  </div>
</template>

<script>
import About from '@/components/home/About'
import Articles from '@/components/home/Articles'
import Banner from '@/components/home/Banner'
import Subscribe from '@/components/home/Subscribe'
import Footer from '@/components/home/Footer'



  export default {
    name: 'Home',

    components: {
      About,
      Articles,
      Banner,
      Subscribe,
      Footer
    }
  }
</script>

<template>
  <div class="history">
      <h1 class="ml-5 subtitle-1 grey--text">Riwayat pemesanan</h1>
<!-- Expansion Panel -->
  <v-container class="my-5">
    <h2 class="subtitle-1 ma-4">Ongoing</h2>
      <v-expansion-panels>
      <v-expansion-panel v-for="history in myhistorys2" :key="history.title">
        <v-expansion-panel-header>Pemesanan tanggal {{history.tanggal}}</v-expansion-panel-header>
        <v-expansion-panel-content class="px-4 grey--text">
          <div class="font-weight-bold">{{history.title}} oleh {{history.person}}</div>
          <div>{{history.content}}</div>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>


    <h2 class="subtitle-1 ma-4">Complete</h2>
      <v-expansion-panels>
      <v-expansion-panel v-for="history in myhistorys" :key="history.title">
        <v-expansion-panel-header>Pemesanan tanggal {{history.tanggal}}</v-expansion-panel-header>
        <v-expansion-panel-content class="px-4 grey--text">
          <div class="font-weight-bold">{{history.title}} oleh {{history.person}}</div>
          <div>{{history.content}}</div>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-container>
  </div>
</template>

<script>
export default {
    data: () => ({
    historys: [
        { title: 'Nama barang 1', person: 'Van Lexiku', tanggal: '1st Jan 2019', status: 'complete', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt consequuntur eos eligendi illum minima adipisci deleniti, dicta mollitia enim explicabo fugiat quidem ducimus praesentium voluptates porro molestias non sequi animi!'},
        { title: 'Nama barang 2', person: 'Van Lexiku', tanggal: '10th Jan 2019', status: 'complete', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt consequuntur eos eligendi illum minima adipisci deleniti, dicta mollitia enim explicabo fugiat quidem ducimus praesentium voluptates porro molestias non sequi animi!'},
        { title: 'Nama barang 3', person: 'Van Lexiku', tanggal: '20th Dec 2018', status: 'ongoing', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt consequuntur eos eligendi illum minima adipisci deleniti, dicta mollitia enim explicabo fugiat quidem ducimus praesentium voluptates porro molestias non sequi animi!'},
        { title: 'Nama barang 4', person: 'Van Lexiku', tanggal: '20th Oct 2018', status: 'ongoing', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt consequuntur eos eligendi illum minima adipisci deleniti, dicta mollitia enim explicabo fugiat quidem ducimus praesentium voluptates porro molestias non sequi animi!'},
      ]
    }),
    // sorting data
    computed:{
    myhistorys(){
      return this.historys.filter(history =>{
        return history.person === 'Van Lexiku' && history.status === 'complete'
      })
    },
    myhistorys2(){
      return this.historys.filter(history =>{
        return history.person === 'Van Lexiku' && history.status === 'ongoing'
      })
    },
  },
}
</script>

<style>

</style>
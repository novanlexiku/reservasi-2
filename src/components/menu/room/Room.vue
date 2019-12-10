<template>
    <v-container grid-list-xs>
                        <v-row>
                            <!-- Deskripsi Ruangan -->
                            <v-col cols="12" sm="8">
                                <v-card
                                max-width="700"
                                >
                                    <v-list-item>
                                    <v-list-item-avatar color="grey"></v-list-item-avatar>
                                    <v-list-item-content>
                                        <v-list-item-title class="headline">Our Changing Planet</v-list-item-title>
                                        <v-list-item-subtitle>by Kurt Wagner</v-list-item-subtitle>
                                    </v-list-item-content>
                                    </v-list-item>
                                            <div class="d-flex flex-no-wrap justify-space-between">
                                            <div>
                                                <v-card-text>
                                                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolores, velit? Expedita perferendis qui obcaecati eum voluptatum provident, velit voluptate tenetur consectetur quibusdam culpa hic mollitia corporis unde quod dolor? Facilis.
                                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Earum, omnis et voluptatibus natus quam nesciunt, amet neque similique eligendi est fuga laudantium. Architecto eius nisi maiores vel, excepturi aut. Nemo.
                                                </v-card-text>
                                            </div>
                                                <v-img
                                                src="https://cdn.vuetifyjs.com/images/cards/mountain.jpg"
                                                height="194"
                                                max-width="300"
                                                class="mr-1"
                                                ></v-img>
                                            </div>
                                    <v-card-actions>
                                    <v-btn
                                        text
                                        color="primary accent-4"
                                    >
                                        Pesan Sekarang
                                    </v-btn>
                                    <v-spacer></v-spacer>
                                    <v-btn icon>
                                        <v-icon>mdi-heart</v-icon>
                                    </v-btn>
                                    <v-btn icon>
                                        <v-icon>mdi-share-variant</v-icon>
                                    </v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-col>
                            <!-- Gallery ruangan -->
                        <v-col cols="12" sm="4">
                            <v-card>
                                <v-container fluid>
                                <v-row>
                                    <v-col
                                    v-for="n in 4"
                                    :key="n"
                                    class="d-flex child-flex"
                                    cols="6"
                                    >
                                    <v-card flat tile class="d-flex">
                                        <v-img
                                        :src="`https://picsum.photos/500/300?image=${n * 5 + 10}`"
                                        :lazy-src="`https://picsum.photos/10/6?image=${n * 5 + 10}`"
                                        aspect-ratio="1"
                                        class="grey lighten-2"
                                        
                                        >
                                        <template v-slot:placeholder>
                                            <v-row
                                            class="fill-height ma-0"
                                            align="center"
                                            justify="center"
                                            >
                                            <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                                            </v-row>
                                        </template>
                                        </v-img>
                                    </v-card>
                                    </v-col>
                                </v-row>
                                </v-container>
                            </v-card>
                        </v-col>
                    </v-row>
        
    </v-container>
</template>

<script>
export default {
    data: () => ({
        image:true
    }),
methods:{
    showImage(){
    this.image = false
    }
}
}
</script>

<style>

</style>
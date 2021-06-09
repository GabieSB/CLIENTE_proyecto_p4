Sliding: false

<template>
<div>
    <b-carousel id="carousel-1" v-model="slide" :interval="4000" controls indicators background="#ababab" img-width="1024" img-height="480" style="text-shadow: 1px 1px 2px #333;" >
        <!-- Text slides with image -->
        <b-carousel-slide>
            <template v-slot:img>
                <div id="carouselProdutos">
                    <b-card title="Card Title" img-src="https://atamashi.org/wp-content/uploads/2020/01/Plantilla-12.jpg" img-alt="Image" img-top tag="article" style="max-width: 20rem;" class="mb-2">
                        <b-card-text>
                            Some quick example text to build on the card title and make up the bulk of the card's content.
                        </b-card-text>
                    </b-card>
                </div>
                <div id="carouselProdutos">
                    <b-card title="Card Title" img-src="https://img.zonared.com/images/noticias/portada/63000/63986-h.jpg" img-alt="Image" img-top tag="article" style="max-width: 20rem;" class="mb-2">
                        <b-card-text>
                            Some quick example text to build on the card title and make up the bulk of the card's content.
                        </b-card-text>
                    </b-card>
                </div>
                <div id="carouselProdutos">
                    <b-card title="Card Title" img-src="https://esports.as.com/2019/11/28/bonus/Bulbasaur_1304579536_308516_1024x576.jpg" img-alt="Image" img-top tag="article" style="max-width: 20rem;" class="mb-2">
                        <b-card-text>
                            Some quick example text to build on the card title and make up the bulk of the card's content.
                        </b-card-text>
                    </b-card>
                </div>

            </template>
        </b-carousel-slide>
        <b-carousel-slide>
            <template v-slot:img>
                <div id="carouselProdutos">
                    <b-card title="Card Title" img-src="https://64.media.tumblr.com/c4033944bceb338cfbd98d8c5ef37baa/1abf29658173c51a-22/s2048x3072/2ab7a7e905e7cd7fbffa3c49102a102d1eeeb3a1.png" img-alt="Image" img-top tag="article" style="max-width: 20rem;" class="mb-2">
                        <b-card-text>
                            Some quick example text to build on the card title and make up the bulk of the card's content.
                        </b-card-text>
                    </b-card>
                </div>
                <div id="carouselProdutos">
                    <b-card title="Card Title" img-src="https://3.bp.blogspot.com/-hkFnP-cYh1A/UTIjytNLTlI/AAAAAAAAECU/YgdRKzwzUNs/s1600/bwns30203_zpsbf0a2780.png" img-alt="Image" img-top tag="article" style="max-width: 20rem;" class="mb-2">
                        <b-card-text>
                            Some quick example text to build on the card title and make up the bulk of the card's content.
                        </b-card-text>
                    </b-card>
                </div>
                <div id="carouselProdutos">
                    <b-card title="Card Title" img-src="https://www.zonared.com/images/juegos/portada/5000/5052-h.jpg" img-alt="Image" img-top tag="article" style="max-width: 20rem;" class="mb-2">
                        <b-card-text>
                            Some quick example text to build on the card title and make up the bulk of the card's content.
                        </b-card-text>
                    </b-card>
                </div>

            </template>
        </b-carousel-slide>
    </b-carousel>
</div>
</template>

<style>
#carouselProdutos {
    float: left;
    padding-left: 90px;
}
</style>

<template>
    <div class="card">
        <img v-if="post?.mainImage" :src="builder.image(post.mainImage).url()" class="card-img-top" alt="...">
        <div class="card-body">

            <h5 class="card-title">{{ post?.title }}</h5>
            <p class="card-text">
                <PortableText :value="post?.body || []" />
            </p>
            <div class="row">
            <div v-if="post?.images" class="col-sm-4">
                <img  v-for="img in post.images" :src="builder.image(img).url()" class="card-img-top" alt="...">
            </div>
        </div>
   

            <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
    </div>
</template>
  
<script setup lang="ts">
import { PortableText } from '@portabletext/vue';
import imageUrlBuilder from '@sanity/image-url'

const builder = imageUrlBuilder({
    projectId: 'uy0ayswl',
    dataset: 'production',
})



defineProps<{
    post?: Post
}>()

type Post = {
    author: {
        _ref: string;
        _type: string;
    };


    images: {
        _type: string;
        _key: string;
        asset: {
            _ref: string;
            _type: string;
        }
    }[];

    categories: {
        _ref: string;
        _type: string;
        _key: string;
    }[];
    _updatedAt: string;
    slug: {
        current: string;
        _type: string;
    };
    title: string;
    mainImage: {
        _type: string;
        asset: {
            _ref: string;
            _type: string;
        };
    };
    _createdAt: string;
    _rev: string;
    _type: string;
    _id: string;
    body: {
        _type: string;
        style: string;
        _key: string;
        markDefs: any[]; // You can define a type for markDefs if needed
        children: {
            _key: string;
            _type: string;
            marks: any[]; // You can define a type for marks if needed
            text: string;
        }[];
    }[];
};
</script>
  
<style lang="css" scoped></style>
<template>
  <div class="container">
    <h1>Junviglund</h1>
    <div class="row">
      <div v-for="p in posts" :key="p._id" class="col-sm-12">
        <BlogPost :post="p" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

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

const posts: Post[] = (await useFetch(() => '/api/post')).data.value
</script>

<style lang="css" scoped></style>

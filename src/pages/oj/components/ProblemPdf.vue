<template>
  <div id="pdfvuer">
    <pdf :src="pdfdata" v-for="i in numPages" :key="i" :id="i" :page="i"
       style="width:55%;margin:20px auto;"
        :annotation="true"
        :resize="true"
        @link-clicked="handle_pdf_link">
      <template slot="loading">
        loading content here...
      </template>
    </pdf>
  </div>
</template>

<script>
import pdfvuer from 'pdfvuer'

export default {
  components: {
    pdf: pdfvuer
  },
  props: {
    url: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      page: 1,
      numPages: 0,
      pdfdata: undefined,
      errors: []
    }
  },
  mounted () {
    this.getPdf()
  },
  watch: {
    show: function (s) {
      if (s) {
        this.getPdf()
      }
    }
  },
  methods: {
    handle_pdf_link: function (params) {
      // Scroll to the appropriate place on our page - the Y component of
      // params.destArray * (div height / ???), from the bottom of the page div
      var page = document.getElementById(String(params.pageNumber))
      page.scrollIntoView()
    },
    getPdf () {
      this.pdfdata = pdfvuer.createLoadingTask(this.url)
      this.pdfdata.then(pdf => {
        this.numPages = pdf.numPages
      })
    }
  }
}
</script>
<style src="pdfvuer/dist/pdfvuer.css"></style>
<style lang="css" scoped>
  #buttons {
    margin-left: 0 !important;
    margin-right: 0 !important;
  }
  /* Page content */
  .content {
    padding: 16px;
  }
</style>

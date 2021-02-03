<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no">
    <title>	ciel-ui</title>
  </head>
  <body>
    <div id="app"></div>
	<% if (process.env.NODE_ENV === 'production') { %>
	  <script type="text/javascript" src="https://cdn.bootcss.com/vue/2.5.17/vue.min.js"></script>
	  <script type="text/javascript" src="https://cdn.bootcss.com/vue-router/3.0.1/vue-router.min.js"></script>
	  <script type="text/javascript" src="https://cdn.bootcdn.net/ajax/libs/highlight.js/10.5.0/highlight.min.js"></script>
	<% } %>
    <!-- built files will be auto injected -->
  </body>
</html>

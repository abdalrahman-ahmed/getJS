# getJS
A simple function for loading JS &amp; CSS files asynchronously
- Licensed MIT

## Usage

Place the [`getJS` function](https://github.com/abdalrahman-ahmed/getJS/blob/master/getJS.js) inline in the `head` of your page (it can also be included in an external JavaScript file if preferable).

Then call it by passing it a JavaScript URL:

``` html
<head>
	...
	<!-- include getJS here... -->
	<script src="getJS.js"></script>
	<!-- just example... -->
	<script>
		getJS( url, callback );
	</script>
	...
</head>
```

### Examples

Load a single file with getJS:

``` js
getJS( "/path/to/script.js" );
```

You can execute code after the File has loaded via a callback:

``` js
getJS( "/path/to/script.js", function() {
	// The file has loaded
});
```

You can load multi files via Array:

``` js
// Example Without Callback!
getJS( ["/path/to/script.js","/path/to/style.css",...] );

// Example With Callback!
getJS( [
	"https://code.jquery.com/jquery-latest.min.js",
	"/path/to/script.js",
	"/path/to/style.css",
	"https://maxcdn.bootstrapcdn.com/bootstrap/3.3.0/css/bootstrap.min.css",
	...
], function() {
	// All files has loaded
});
```

#### Notice
getJS Will automatically added hostname `location.origin` if not find it in path.
###### Example:
```js
getJS( "/javascript/script.js" );
```
This file will append to `<head>` like `<script src="http://localhost/javascript/script.js" async></script>`

require 'sass-css-importer'

# Set this to the root of your project when deployed:
http_path = "build"
css_dir = "source/styles"
sass_dir = "source/styles"
images_dir = "source/images"
generated_images_dir = "build/images/"
javascripts_dir = "source/scripts"

sass_options = {
	:sourcemap => true
}

enable_sourcemaps = true

add_import_path Sass::CssImporter::Importer.new("node_modules")

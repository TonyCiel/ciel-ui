export default {
	/**
	 * 截图粘贴
	 * @param selector
	 * @param callback
	 */
	paste(elem, callback) {
		elem.addEventListener("paste", function(ev) {
			var data = ev.clipboardData;
			var items = (event.clipboardData || event.originalEvent.clipboardData).items;
			for (var i in items) {
				var item = items[i];
				//如果是图片
				if (item.kind === 'file' && item.type.indexOf('image') > -1) {
					var blob = item.getAsFile();
					var reader = new FileReader();
					//reader读取完成后，xhr上传
					reader.onload = function(event) {
						if (typeof callback === "function") {
							callback(event.target.result);
						}
					}; // data url!
					reader.readAsDataURL(blob); //reader
				}
			}
		});
	},

	/**
	 * 拖拽上传
	 * @param selector
	 * @param callback
	 */
	drag(element, callback) {
		element.addEventListener("drop", function(e) {
			e.preventDefault();
			var files = e.dataTransfer.files;
			for (var i = 0; i < files.length; i++) {
				var item = files[i];
				if (!item.type.match(/jpeg|jpg|png|gif|bmp/)) {
					return;
				}
				//回调文件
				//alert("Drop " + file[i].name.toString());
				var reader = new FileReader();
				reader.onload = function(event) {
					if (typeof callback === "function") {
						callback(event.target.result);
					}
				};
				reader.readAsDataURL(files[i]);
				if (i == 1) {
					break;
				}
			}
			return false;
		});

		element.addEventListener("dragenter", function(e) {
			e.stopPropagation();
			e.preventDefault();
		});

		element.addEventListener("dragover", function(e) {
			e.dataTransfer.dropEffect = "copy";
			e.stopPropagation();
			e.preventDefault();
		});

		document.body.addEventListener("dragover", function(e) {
			e.stopPropagation();
			e.preventDefault();
			return false;
		});
	}
}

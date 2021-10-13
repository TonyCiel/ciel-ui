import testButton from '../packages/test-button/index.js';
import testText from '../packages/test-text/index.js';
import cielButton from '../packages/button/index.js';
import cielRow from '../packages/row/index.js';
import cielCol from '../packages/col/index.js';
import Toast from '../packages/toast/index.js';
import cielInput from '../packages/input/index.js';
import cielFilterselect from '../packages/filterselect/index.js';
import cielCalendar from '../packages/calendar/index.js';
import cielTimePicker from '../packages/timepicker/index.js';
import cielRichEditor from '../packages/richeditor/index.js';
import cielSelect from '../packages/select/index.js';
import cielOption from '../packages/option/index.js';
import '../examples/assets/styles/toast.css';
import '../examples/assets/icon/iconfont.css';
import '../examples/assets/icon/icon.css';


const components = [
  testButton,
  testText,
	cielButton,
	cielRow,
	cielCol,
	cielInput,
	cielFilterselect,
	cielCalendar,
	cielTimePicker,
	cielRichEditor,
	cielSelect,
	cielOption
];

const install = function(Vue, opts = {}) {
  components.forEach(component => {
    Vue.component(component.name, component);
  });
	Vue.prototype.$toast = Toast;

};

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
	install,
	testButton,
	testText,
	cielButton,
	cielRow,
	cielCol,
	Toast,
	cielInput,
	cielFilterselect,
	cielCalendar,
	cielTimePicker,
	cielRichEditor,
	cielSelect,
	cielOption
};

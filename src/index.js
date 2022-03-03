import $ from 'jquery';
import {Buttons} from './Buttons';
import './_clicker.scss';

import './_simon.scss';
import {Simon} from './Simon';

$(document).ready(function() {
    new Buttons();
    new Simon('#simon');
});
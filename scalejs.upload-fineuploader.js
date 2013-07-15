/*global define*/
define([
    'knockout',
    './scalejs.upload-fineuploader/upload'
], function (
    ko,
    fineUpload
) {
    'use strict';

    ko.bindingHandlers.fineUpload = fineUpload;
});


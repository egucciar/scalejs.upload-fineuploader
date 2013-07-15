
/*global define*/
define('scalejs.upload-fineuploader/upload',[
    'scalejs!core',
    'knockout',
    'fineuploader'
], function (
    core,
    ko,
    qq
) {
    

    var isObservable = ko.isObservable,
        observable = ko.observable,
        merge = core.object.merge,
        is = core.type.is;


    /*jslint unparam: true*/
    function init(
        element,
        valueAccessor,
        allBindingsAccessor
    ) {
        var b = allBindingsAccessor(),
            fileList = b.fineUpload.fileList,
            endpoint = b.fineUpload.endpoint,
            guid = b.fineUpload.guid,
            inputName = b.fineUpload.inputName,
            multiple,
            submitted = {},
            options,
            upload;

        if (!isObservable(fileList)) {
            throw {
                name: 'Invalid Object Type',
                message: 'Upload fileList must be an Observable'
            };
        }

        multiple = is(fileList(), 'array');

        options = {
            callbacks: {
                onSubmit: function (id, fileName) {
                    var file = {
                        fileName: fileName,
                        status: observable('Submitted')
                    };
                    submitted[id] = file;
                    if (multiple) {
                        file.remove = function () {
                            submitted[id].status('Removed');
                            fileList(fileList());
                            delete submitted[id];
                        };
                        fileList.push(file);
                    } else {
                        fileList(file);
                    }
                },
                onComplete: function (id, fileName, status) {
                    submitted[id].status('Completed');
                }
            },
            multiple: multiple
        };

        upload = new qq.FineUploaderBasic(
            merge(options, {
                button: element,
                request: {
                    endpoint: endpoint + '?guid=' + guid,
                    paramsInBody: true,
                    inputName: inputName
                }
            })
        );
    }
    /*jslint unparam: false*/

    return {
        init: init
    };
});


/*global define*/
define('scalejs.upload-fineuploader',[
    'knockout',
    './scalejs.upload-fineuploader/upload'
], function (
    ko,
    fineUpload
) {
    

    ko.bindingHandlers.fineUpload = fineUpload;
});


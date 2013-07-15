param($installPath, $toolsPath, $package, $project)

$project |
	Remove-Paths 'scalejs.upload-fineuploader, fineuploader' |
	Remove-Shims 'fineuploader' |
	Remove-ScalejsExtension 'scalejs.upload-fineuploader' |
	Out-Null

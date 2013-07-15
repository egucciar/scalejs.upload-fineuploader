param($installPath, $toolsPath, $package, $project)

$project |
	Add-Paths "{
		'scalejs.upload-fineuploader' : 'Scripts/scalejs.upload-fineuploader-$($package.Version)',
		'fineuploader'				  : 'Scripts/fineuploader-3.1.1'
	}" |
	Add-Shims "{ 
		'fineuploader'		: { 
			'exports' : 'qq'
		}
	}" |
	Add-ScalejsExtension 'scalejs.upload-fineuploader' |
	Out-Null
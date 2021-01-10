This script is get thumbnail based on Video ID of Vimeo.

# Usage

First, write in config.json with information about the video you want to retrieve.
That information should be written with `Object in Array`.

Can be config is follows.

```
| Property name | Type | Description | Required |
| name | string | Name of the image to output. | Yes |
| id | number | Video ID of Vimeo. | Yes |
| width | number | Thumbnail width. default 1280. | No |
| height | number | Thumbnail height. default 720. | No |
```

If you configured setting, please run follow command in CLI.

```
node index.js
```

After running the program, you will see the thumbnails downloaded to the im directory.

## For example

```
[
    {
        "name": "thumbnail_01",
        "id": 0
    },
    {
        "name": "thumbnail_02",
        "id": 1,
        "width": 480,
        "height": 270
    }
]
```



# A level editor for the poggiest game of all time

## Creating a level
First, when you open Tiled, make sure you are opening ```nine-lives.tiled-project```. **Before you start making a level make sure you have turned on View -> Snapping -> Snap to Grid.**

To make a level, it is easiest to copy ```level-template.tmx```. The map itself has a ```biome``` property that is parsed to specify the tileset for the walls - right now we only have the metal tileset so make sure it is set to ```metal```.

To make walls, select the ```metalWalls``` layer and the ```metal-walls``` tileset. This is a tile layer, so all you can do is place (B) and erase tiles (E). Ensure that Map -> AutoMap While Drawing is turned on so that the tileset is automatically read. When you are finished with the tile layout of the walls, select the ```wallsPoly``` layer, which is layer that contains the actual Box2D shape of the walls. Each object in the ```wallsPoly``` layer must be a polygon (P), you should create as many polygons as necessary to cover all boundaries of the walls in your level.

To add the cat, checkpoints, flamethrowers, lasers, spikes, mobs and activators, select the corresponding layer and the ```objects``` tileset. Place corresponding objects into the layer by inserting tiles (T), and edit their properties if necessary. To rotate the object, change the rotation field - flipping it will not do anything. The greyed out default values of each property is the default value **parsed by us in the game**, not the default value into the JSON - if you leave the default value then there will not be a field for it in the JSON. This is not an issue **except** for activators, which must have an ```id```.

Doors, platforms, spirit regions and exits are represented in their respective layer as rectangles (R), **not** polygons. To add them, select the corresponding layer, draw a rectangle, and set the class of that rectangle to corresponding class. Do not rotate any rectangles or else they will be parsed incorrectly - for doors, the ```closeAngle``` property determines the direction that the door closes in.

To add mirrors or boxes, select the layer and add any tile, since right now we do not have assets for these. I like using tiles from the AutoMap rules tileset (which you can see in the template) since I feel like they kinda look like mirrors and boxes, but really it doesn't matter at all (and actually the AutoMap rules tileset is finicky to work with since you have to scale all the tiles to 1024x1024).

Currently the level template map size is **infinite**. This is because the automapping rules fail at the edges of a level and I don't want to figure out how to fix it. Whenever you are designing a level, you should keep the map size as infinite, and only resize the map once you have finished (Map -> Map properties -> uncheck infinity, Map -> Resize Map), otherwise you will have to manually place from the tileset at edges. Note that currently this means that the tileset is not used properly at the border between levels - if anyone wants to try and fix this please go ahead (I don't want to be the tiled guy), it would involve adding new rules to the automapping tileset (```./metal-wall-rules.tmx```, look [here](https://doc.mapeditor.org/en/stable/manual/automapping/) for more info).

## Adding the new level to the game
Currently the workflow for adding a level to the game is a bit annoying:
- Export the map as a JSON, and copy/move it into the ```assets/tiled/``` folder in the repo.
- In ```assets/assets.json```, add a new entry under the ```jsons``` field. The key must be of the form ```tiledLevel[level number]```, the value is the path to the JSON. 
- If necessary, in ```NineLives.java```, increase the total number of levels by changing the number into the constructor call for the ```WorldController``` (currently line 44).


## Adding a new type of object
I am unsure if we will ever need to do this, but I'll put this just in case. As of right now there are two possible types of objects we could be adding. For an object that always takes up a set amount of grid cells:
- Add the image to the ```./objects``` folder (1024x1024 is the current grid cell size).
- Open ```./objects/objects.tsx``` (this is the objects tileset), and add the image to the tileset.
- Create a class for the object by going to View -> Custom Types Editor. Deselect Property value, and use only as class of object and tile.
    - If you need properties with multiple fields (such as Vector2), or you properties with a set number of values, you can create classes/enums for them.
- Parse the object in ```level.populateObjects()```

For an object that does not always have the same shape:
- Create a class for the object as outlined above. This time there is no way as far as I know to ensure that objects within a layer all are of the same class, so we must set them manually every time we add them.
- Parse the object in ```level.populateObjects()```


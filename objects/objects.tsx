<?xml version = "1.0" encoding = "UTF-8" ?>
  <tileset version="1.10" tiledversion="1.10.1" name="objects" tilewidth="1024" tileheight="2048" tilecount="8" columns="0" objectalignment="topleft">
    <grid orientation="orthogonal" width="1" height="1" />
    <tile id="0" type="Activator">
      <properties>
        <property name="shouldPan" type="bool" value="false" />
      </properties>
      <image width="1024" height="1024" source="button.png" />
    </tile>
    <tile id="1">
      <image width="1024" height="1024" source="cat.png" />
    </tile>
    <tile id="2">
      <image width="1024" height="2048" source="checkpoint.png" />
    </tile>
    <tile id="3" type="Flamethrower">
      <image width="1024" height="1024" source="flamethrower.png" />
    </tile>
    <tile id="4" type="Laser">
      <image width="1024" height="1024" source="laser.png" />
    </tile>
    <tile id="5" type="Mob">
      <image width="1024" height="2048" source="mob.png" />
    </tile>
    <tile id="6" type="Spikes">
      <image width="1024" height="1024" source="spikes.png" />
    </tile>
    <tile id="8">
      <image width="1024" height="2048" source="goal.png" />
    </tile>
  </tileset>

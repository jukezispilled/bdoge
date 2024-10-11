import React, { useState, useRef, useEffect } from 'react';
import { Stage, Layer, Image, Transformer } from 'react-konva';
import useImage from 'use-image';
import { Window, WindowHeader, WindowContent, Button } from 'react95';

const PfpMaker = () => {
  const [assets, setAssets] = useState([]);
  const [selectedId, selectShape] = useState(null);
  const stageRef = useRef(null);

  const [basePfp] = useImage('baby.png');

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new window.Image();
      img.src = e.target.result;
      img.onload = () => {
        const aspect = img.width / img.height;
        let newWidth = 100;
        let newHeight = 100 / aspect;
        if (newHeight > 100) {
          newHeight = 100;
          newWidth = 100 * aspect;
        }
        setAssets([...assets, { 
          id: Date.now(), 
          img: img, 
          x: 250 - newWidth / 2, 
          y: 250 - newHeight / 2, 
          width: newWidth, 
          height: newHeight 
        }]);
      };
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    const uri = stageRef.current.toDataURL();
    const link = document.createElement('a');
    link.download = 'custom_pfp.png';
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDelete = () => {
    setAssets(assets.filter(asset => asset.id !== selectedId));
    selectShape(null);
  };

  return (
    <Window>
      <div className='flex flex-col items-center justify-center bg-[#FD89FF] text-white p-2'>
        <div className='mb-4'>
          <input type='file' onChange={handleFileUpload} accept='image/*' />
          <button onClick={handleSave} className='ml-2 px-4 py-2 bg-blue-500 text-white'>Save</button>
          {selectedId && (
            <button onClick={handleDelete} className='ml-2 px-4 py-2 bg-red-500 text-white'>Delete</button>
          )}
        </div>
        <Stage width={400} height={400} ref={stageRef}>
          <Layer>
            <Image className="border-2 border-black" image={basePfp} width={400} height={400} />
            {assets.map((asset) => (
              <AssetImage
                key={asset.id}
                shapeProps={asset}
                isSelected={asset.id === selectedId}
                onSelect={() => selectShape(asset.id)}
                onChange={(newAttrs) => {
                  const newAssets = assets.map(a => {
                    if (a.id === asset.id) {
                      return { ...a, ...newAttrs };
                    }
                    return a;
                  });
                  setAssets(newAssets);
                }}
              />
            ))}
          </Layer>
        </Stage>
      </div>
    </Window>
  );
};

const AssetImage = ({ shapeProps, isSelected, onSelect, onChange }) => {
  const shapeRef = useRef();
  const trRef = useRef();

  useEffect(() => {
    if (isSelected) {
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  return (
    <>
      <Image
        image={shapeProps.img}
        onClick={onSelect}
        onTap={onSelect}
        ref={shapeRef}
        {...shapeProps}
        draggable
        onDragEnd={(e) => {
          onChange({
            ...shapeProps,
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
        onTransformEnd={(e) => {
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          node.scaleX(1);
          node.scaleY(1);
          onChange({
            ...shapeProps,
            x: node.x(),
            y: node.y(),
            width: Math.max(5, node.width() * scaleX),
            height: Math.max(5, node.height() * scaleY),
          });
        }}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </>
  );
};

export default PfpMaker;
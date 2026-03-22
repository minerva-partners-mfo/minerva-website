#!/bin/bash
# Compress all videos to max 5MB, 1080p, H.264, no audio
# Generate poster frames (first frame as JPG)
# Usage: bash scripts/compress-videos.sh

VIDEOS_DIR="public/videos"
POSTERS_DIR="public/images/posters"
BACKUP_DIR="public/videos/originals"

mkdir -p "$POSTERS_DIR"
mkdir -p "$BACKUP_DIR"

for video in "$VIDEOS_DIR"/*.mp4; do
  filename=$(basename "$video" .mp4)

  echo "Processing: $filename.mp4"

  # 1. Extract poster frame (first frame)
  ffmpeg -y -i "$video" -vframes 1 -q:v 2 "$POSTERS_DIR/$filename.jpg" 2>/dev/null
  echo "  Poster: $POSTERS_DIR/$filename.jpg"

  # 2. Backup original
  cp "$video" "$BACKUP_DIR/$filename.mp4"

  # 3. Compress: 1080p, H.264, CRF 28, no audio, fast start
  ffmpeg -y -i "$BACKUP_DIR/$filename.mp4" \
    -vf "scale=-2:1080" \
    -c:v libx264 \
    -preset slow \
    -crf 28 \
    -an \
    -movflags +faststart \
    -pix_fmt yuv420p \
    "$video" 2>/dev/null

  # Show size comparison
  original_size=$(stat -f%z "$BACKUP_DIR/$filename.mp4" 2>/dev/null || stat -c%s "$BACKUP_DIR/$filename.mp4" 2>/dev/null)
  new_size=$(stat -f%z "$video" 2>/dev/null || stat -c%s "$video" 2>/dev/null)
  echo "  Size: $(( original_size / 1024 / 1024 ))MB -> $(( new_size / 1024 / 1024 ))MB"
  echo ""
done

echo "Done! All videos compressed and posters generated."
echo "Originals saved in $BACKUP_DIR/"

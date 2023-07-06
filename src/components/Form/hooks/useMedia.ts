import { useState } from 'react'
import { launchCamera, ImagePickerResponse, Asset } from 'react-native-image-picker'

export type MediaProps = Asset

export function useMedia() {
  const [medias, setMedias] = useState<ImagePickerResponse['assets']>([])

  async function handlePickerImage() {
    const result = await launchCamera({
      mediaType: 'photo',
      cameraType: 'back',
      saveToPhotos: true,
    })

    if (result?.assets && medias) {
      setMedias([...medias, ...result.assets])
    }
  }

  function handleDeleteMedia(index: number) {
    if (!medias) return

    const newMedias = [...medias]
    newMedias.splice(index, 1)
    setMedias(newMedias)
  }

  return {
    medias,
    handleDeleteMedia,
    handlePickerImage,
  }
}

'use client'

import { useRef } from 'react'
import html2canvas from 'html2canvas-pro'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'

import { Download } from 'lucide-react'

import { DownloadCertificateProps } from './DownloadCertificate.types'
import Certificate from '../Certificate/Certificate'

const DownloadCertificate = (props: DownloadCertificateProps) => {
  const { userName, titleCourse } = props

  const certRef = useRef<HTMLDivElement>(null)
  const handleDownload = async () => {
    if (!certRef.current) return

    const canvas = await html2canvas(certRef.current, {
      scale: 1
    })
    const link = document.createElement('a')
    link.download = `certificado-${titleCourse}.png`
    link.href = canvas.toDataURL('image/png')
    link.click()
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant='outline'>
          Descargar certificado
          <Download className='w-4 h-4 ml-2' />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className='w-full max-w-[900px]!'>
        <AlertDialogHeader>
          <AlertDialogTitle>Descarga tu certificado</AlertDialogTitle>
          <AlertDialogDescription asChild>
            <Certificate userName={userName} titleCourse={titleCourse} cerRef={certRef} />
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleDownload}>
            Descargar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DownloadCertificate

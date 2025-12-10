"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Clock, CheckCircle, ArrowLeft, Play } from "lucide-react"
import Link from "next/link"

interface Lesson {
  id: string
  title: string
  description: string
  duration: number
  driveUrl: string
  completed: boolean
  module: string
}

export default function LessonPlayerPage({ params }: { params: { id: string } }) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [lesson, setLesson] = useState<Lesson | null>(null)
  const [loading, setLoading] = useState(true)
  const [isCompleting, setIsCompleting] = useState(false)

  useEffect(() => {
    if (status === "loading") return
    if (!session) {
      router.push("/login")
    }
  }, [session, status, router])

  useEffect(() => {
    // Mock data - substituir com chamada API real
    const mockLesson: Lesson = {
      id: params.id,
      title: "Introdução ao Marketing Digital",
      description: "Nesta aula você vai aprender os conceitos fundamentais do marketing digital e como ele pode transformar seu negócio. Vamos cobrir os principais canais digitais, estratégias eficazes e como medir o sucesso das suas campanhas.",
      duration: 15,
      driveUrl: "https://drive.google.com/file/d/1_example/preview",
      completed: false,
      module: "Módulo 1 - Fundamentos"
    }

    setTimeout(() => {
      setLesson(mockLesson)
      setLoading(false)
    }, 1000)
  }, [params.id])

  const handleCompleteLesson = async () => {
    if (!lesson) return
    
    setIsCompleting(true)
    try {
      // Mock API call - substituir com chamada real
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setLesson({
        ...lesson,
        completed: true
      })
    } catch (error) {
      console.error("Erro ao marcar aula como concluída:", error)
    } finally {
      setIsCompleting(false)
    }
  }

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Carregando aula...</p>
        </div>
      </div>
    )
  }

  if (!session || !lesson) {
    return null
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/aulas" className="flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Voltar para aulas
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium text-slate-900">{session.user?.name}</p>
              <p className="text-xs text-slate-500">{session.user?.email}</p>
            </div>
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-blue-600">
                {session.user?.name?.charAt(0).toUpperCase()}
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Video Player */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-0">
                <div className="aspect-video bg-slate-900 rounded-lg overflow-hidden">
                  <iframe
                    src={lesson.driveUrl}
                    className="w-full h-full"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                    title={lesson.title}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Lesson Actions */}
            <div className="mt-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-slate-600">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">{lesson.duration} minutos</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <BookOpen className="w-4 h-4" />
                  <span className="text-sm">{lesson.module}</span>
                </div>
              </div>
              
              <Button
                onClick={handleCompleteLesson}
                disabled={lesson.completed || isCompleting}
                className={lesson.completed 
                  ? "bg-green-600 hover:bg-green-700" 
                  : "bg-blue-600 hover:bg-blue-700"
                }
              >
                {isCompleting ? (
                  "Processando..."
                ) : lesson.completed ? (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Concluída
                  </>
                ) : (
                  "Marcar como Concluída"
                )}
              </Button>
            </div>
          </div>

          {/* Lesson Info */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">{lesson.title}</CardTitle>
                <CardDescription>{lesson.module}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2">Descrição</h4>
                    <p className="text-slate-600 leading-relaxed">
                      {lesson.description}
                    </p>
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="font-semibold text-slate-900 mb-3">Recursos desta aula</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Play className="w-4 h-4 text-blue-600" />
                        <span>Vídeo em alta definição</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <BookOpen className="w-4 h-4 text-blue-600" />
                        <span>Material de apoio PDF</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <CheckCircle className="w-4 h-4 text-blue-600" />
                        <span>Certificado de conclusão</span>
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="font-semibold text-slate-900 mb-3">Próximas aulas</h4>
                    <div className="space-y-2">
                      {[
                        "Planejamento de Marketing Digital",
                        "Métricas e KPIs",
                        "SEO - Otimização para Mecanismos de Busca"
                      ].map((nextLesson, index) => (
                        <div key={index} className="p-3 bg-slate-50 rounded-lg">
                          <p className="text-sm font-medium text-slate-900">{nextLesson}</p>
                          <p className="text-xs text-slate-600">Aula {parseInt(params.id) + index + 1}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
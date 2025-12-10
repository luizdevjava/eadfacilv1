"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, Clock, CheckCircle, PlayCircle, Lock } from "lucide-react"
import Link from "next/link"

interface Lesson {
  id: string
  title: string
  description: string
  duration: number
  driveUrl: string
  completed: boolean
  module: string
  order: number
}

export default function AulasPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [lessons, setLessons] = useState<Lesson[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === "loading") return
    if (!session) {
      router.push("/login")
    }
  }, [session, status, router])

  useEffect(() => {
    // Mock data - substituir com chamada API real
    const mockLessons: Lesson[] = [
      {
        id: "1",
        title: "Introdução ao Marketing Digital",
        description: "Conceitos fundamentais e importância do marketing digital nos negócios modernos",
        duration: 15,
        driveUrl: "#",
        completed: true,
        module: "Módulo 1 - Fundamentos",
        order: 1
      },
      {
        id: "2",
        title: "Planejamento de Marketing Digital",
        description: "Como estruturar um plano de marketing digital eficaz",
        duration: 20,
        driveUrl: "#",
        completed: true,
        module: "Módulo 1 - Fundamentos",
        order: 2
      },
      {
        id: "3",
        title: "Métricas e KPIs",
        description: "Principais indicadores de performance e como analisá-los",
        duration: 18,
        driveUrl: "#",
        completed: false,
        module: "Módulo 1 - Fundamentos",
        order: 3
      },
      {
        id: "4",
        title: "SEO - Otimização para Mecanismos de Busca",
        description: "Fundamentos de SEO e como otimizar seu site para o Google",
        duration: 25,
        driveUrl: "#",
        completed: false,
        module: "Módulo 2 - SEO",
        order: 4
      },
      {
        id: "5",
        title: "Pesquisa de Palavras-chave",
        description: "Como encontrar as melhores palavras-chave para seu negócio",
        duration: 22,
        driveUrl: "#",
        completed: false,
        module: "Módulo 2 - SEO",
        order: 5
      },
      {
        id: "6",
        title: "SEO On-Page",
        description: "Otimização de elementos dentro do seu site",
        duration: 30,
        driveUrl: "#",
        completed: false,
        module: "Módulo 2 - SEO",
        order: 6
      }
    ]

    setTimeout(() => {
      setLessons(mockLessons)
      setLoading(false)
    }, 1000)
  }, [])

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Carregando aulas...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  const completedLessons = lessons.filter(lesson => lesson.completed).length
  const totalDuration = lessons.reduce((acc, lesson) => acc + lesson.duration, 0)
  const completedDuration = lessons.filter(lesson => lesson.completed).reduce((acc, lesson) => acc + lesson.duration, 0)

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-900">EadFácil</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/dashboard" className="text-slate-600 hover:text-blue-600 transition-colors">
                Dashboard
              </Link>
              <Link href="/aulas" className="text-blue-600 font-medium">
                Minhas Aulas
              </Link>
              <Link href="/assinatura" className="text-slate-600 hover:text-blue-600 transition-colors">
                Assinatura
              </Link>
              <Link href="/configuracoes" className="text-slate-600 hover:text-blue-600 transition-colors">
                Configurações
              </Link>
            </nav>
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
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Minhas Aulas</h1>
          <p className="text-slate-600">
            Acompanhe seu progresso e acesse todas as aulas do curso
          </p>
        </div>

        {/* Progress Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Aulas Concluídas</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{completedLessons}/{lessons.length}</div>
              <p className="text-xs text-slate-600">
                {Math.round((completedLessons / lessons.length) * 100)}% completo
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tempo Total</CardTitle>
              <Clock className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{Math.floor(totalDuration / 60)}h {totalDuration % 60}m</div>
              <p className="text-xs text-slate-600">
                {Math.floor(completedDuration / 60)}h {completedDuration % 60}m assistido
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Módulos</CardTitle>
              <BookOpen className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">6</div>
              <p className="text-xs text-slate-600">
                2 concluídos
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Certificado</CardTitle>
              <Lock className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">Bloqueado</div>
              <p className="text-xs text-slate-600">
                Conclua 100% para liberar
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Lessons List */}
        <div className="space-y-6">
          {["Módulo 1 - Fundamentos", "Módulo 2 - SEO"].map((module) => (
            <Card key={module}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                  {module}
                </CardTitle>
                <CardDescription>
                  {lessons.filter(lesson => lesson.module === module).length} aulas •{" "}
                  {lessons
                    .filter(lesson => lesson.module === module)
                    .reduce((acc, lesson) => acc + lesson.duration, 0)} minutos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {lessons
                    .filter(lesson => lesson.module === module)
                    .sort((a, b) => a.order - b.order)
                    .map((lesson) => (
                      <div
                        key={lesson.id}
                        className={`flex items-center justify-between p-4 rounded-lg border ${
                          lesson.completed 
                            ? 'bg-green-50 border-green-200' 
                            : 'bg-white border-slate-200'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            lesson.completed 
                              ? 'bg-green-100' 
                              : 'bg-blue-100'
                          }`}>
                            {lesson.completed ? (
                              <CheckCircle className="w-5 h-5 text-green-600" />
                            ) : (
                              <PlayCircle className="w-5 h-5 text-blue-600" />
                            )}
                          </div>
                          <div>
                            <h4 className={`font-medium ${
                              lesson.completed ? 'text-green-900' : 'text-slate-900'
                            }`}>
                              {lesson.title}
                            </h4>
                            <p className="text-sm text-slate-600">{lesson.description}</p>
                            <p className="text-xs text-slate-500 mt-1">
                              {lesson.duration} minutos
                            </p>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          variant={lesson.completed ? "outline" : "default"}
                          className={lesson.completed ? "border-green-600 text-green-600" : "bg-blue-600 hover:bg-blue-700"}
                          onClick={() => router.push(`/aulas/${lesson.id}`)}
                        >
                          {lesson.completed ? "Revisar" : "Assistir"}
                        </Button>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
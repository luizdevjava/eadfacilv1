"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BookOpen, Plus, Edit, Trash2, Play, Clock } from "lucide-react"
import Link from "next/link"

interface Lesson {
  id: string
  title: string
  description: string
  duration: number
  driveUrl: string
  module: string
  order: number
}

export default function AdminAulasPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [lessons, setLessons] = useState<Lesson[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingLesson, setEditingLesson] = useState<Lesson | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    duration: "",
    driveUrl: "",
    module: "",
    order: ""
  })

  useEffect(() => {
    if (status === "loading") return
    if (!session) {
      router.push("/login")
    }
    if (session.user?.role !== "ADMIN") {
      router.push("/dashboard")
    }
  }, [session, status, router])

  useEffect(() => {
    // Mock data - substituir com chamada API real
    const mockLessons: Lesson[] = [
      {
        id: "1",
        title: "Introdução ao Marketing Digital",
        description: "Conceitos fundamentais do marketing digital",
        duration: 15,
        driveUrl: "https://drive.google.com/file/d/1_example/preview",
        module: "Módulo 1 - Fundamentos",
        order: 1
      },
      {
        id: "2",
        title: "Planejamento de Marketing Digital",
        description: "Como estruturar um plano eficaz",
        duration: 20,
        driveUrl: "https://drive.google.com/file/d/2_example/preview",
        module: "Módulo 1 - Fundamentos",
        order: 2
      },
      {
        id: "3",
        title: "SEO - Otimização para Google",
        description: "Fundamentos de SEO",
        duration: 25,
        driveUrl: "https://drive.google.com/file/d/3_example/preview",
        module: "Módulo 2 - SEO",
        order: 3
      }
    ]

    setTimeout(() => {
      setLessons(mockLessons)
      setLoading(false)
    }, 1000)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      // Mock API call - substituir com chamada real
      if (editingLesson) {
        setLessons(lessons.map(lesson => 
          lesson.id === editingLesson.id 
            ? {
                ...lesson,
                title: formData.title,
                description: formData.description,
                duration: parseInt(formData.duration),
                driveUrl: formData.driveUrl,
                module: formData.module,
                order: parseInt(formData.order)
              }
            : lesson
        ))
      } else {
        const newLesson: Lesson = {
          id: Date.now().toString(),
          title: formData.title,
          description: formData.description,
          duration: parseInt(formData.duration),
          driveUrl: formData.driveUrl,
          module: formData.module,
          order: parseInt(formData.order)
        }
        setLessons([...lessons, newLesson])
      }
      
      setShowForm(false)
      setEditingLesson(null)
      setFormData({
        title: "",
        description: "",
        duration: "",
        driveUrl: "",
        module: "",
        order: ""
      })
    } catch (error) {
      console.error("Erro ao salvar aula:", error)
    }
  }

  const handleEdit = (lesson: Lesson) => {
    setEditingLesson(lesson)
    setFormData({
      title: lesson.title,
      description: lesson.description,
      duration: lesson.duration.toString(),
      driveUrl: lesson.driveUrl,
      module: lesson.module,
      order: lesson.order.toString()
    })
    setShowForm(true)
  }

  const handleDelete = async (lessonId: string) => {
    if (confirm("Tem certeza que deseja excluir esta aula?")) {
      try {
        // Mock API call - substituir com chamada real
        setLessons(lessons.filter(lesson => lesson.id !== lessonId))
      } catch (error) {
        console.error("Erro ao excluir aula:", error)
      }
    }
  }

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Carregando...</p>
        </div>
      </div>
    )
  }

  if (!session || session.user?.role !== "ADMIN") {
    return null
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin/dashboard" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-900">EadFácil Admin</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/admin/dashboard" className="text-slate-600 hover:text-blue-600 transition-colors">
                Dashboard
              </Link>
              <Link href="/admin/aulas" className="text-blue-600 font-medium">
                Aulas
              </Link>
              <Link href="/admin/usuarios" className="text-slate-600 hover:text-blue-600 transition-colors">
                Usuários
              </Link>
              <Link href="/admin/configuracoes" className="text-slate-600 hover:text-blue-600 transition-colors">
                Configurações
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium text-slate-900">{session.user?.name}</p>
              <p className="text-xs text-slate-500">Administrador</p>
            </div>
            <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-red-600">
                {session.user?.name?.charAt(0).toUpperCase()}
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Gerenciar Aulas</h1>
            <p className="text-slate-600">
              Crie, edite e organize as aulas do seu curso
            </p>
          </div>
          <Button 
            onClick={() => setShowForm(true)}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Nova Aula
          </Button>
        </div>

        {/* Form */}
        {showForm && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>{editingLesson ? "Editar Aula" : "Nova Aula"}</CardTitle>
              <CardDescription>
                Preencha os dados da aula
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Título da Aula</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      placeholder="Ex: Introdução ao Marketing Digital"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="duration">Duração (minutos)</Label>
                    <Input
                      id="duration"
                      type="number"
                      value={formData.duration}
                      onChange={(e) => setFormData({...formData, duration: e.target.value})}
                      placeholder="Ex: 15"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    placeholder="Descreva o conteúdo da aula..."
                    rows={3}
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="module">Módulo</Label>
                    <Select value={formData.module} onValueChange={(value) => setFormData({...formData, module: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o módulo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Módulo 1 - Fundamentos">Módulo 1 - Fundamentos</SelectItem>
                        <SelectItem value="Módulo 2 - SEO">Módulo 2 - SEO</SelectItem>
                        <SelectItem value="Módulo 3 - Conteúdo">Módulo 3 - Conteúdo</SelectItem>
                        <SelectItem value="Módulo 4 - Redes Sociais">Módulo 4 - Redes Sociais</SelectItem>
                        <SelectItem value="Módulo 5 - Tráfego Pago">Módulo 5 - Tráfego Pago</SelectItem>
                        <SelectItem value="Módulo 6 - Email Marketing">Módulo 6 - Email Marketing</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="order">Ordem</Label>
                    <Input
                      id="order"
                      type="number"
                      value={formData.order}
                      onChange={(e) => setFormData({...formData, order: e.target.value})}
                      placeholder="Ex: 1"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="driveUrl">Link do Google Drive</Label>
                  <Input
                    id="driveUrl"
                    value={formData.driveUrl}
                    onChange={(e) => setFormData({...formData, driveUrl: e.target.value})}
                    placeholder="https://drive.google.com/file/d/ID/preview"
                    required
                  />
                </div>

                <div className="flex gap-4">
                  <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                    {editingLesson ? "Atualizar Aula" : "Criar Aula"}
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => {
                      setShowForm(false)
                      setEditingLesson(null)
                      setFormData({
                        title: "",
                        description: "",
                        duration: "",
                        driveUrl: "",
                        module: "",
                        order: ""
                      })
                    }}
                  >
                    Cancelar
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Lessons List */}
        <div className="space-y-4">
          {lessons.map((lesson) => (
            <Card key={lesson.id}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-slate-900">{lesson.title}</h3>
                      <span className="text-sm text-slate-500">{lesson.module}</span>
                    </div>
                    <p className="text-slate-600 mb-3">{lesson.description}</p>
                    <div className="flex items-center gap-4 text-sm text-slate-500">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {lesson.duration} minutos
                      </div>
                      <div className="flex items-center gap-1">
                        <Play className="w-4 h-4" />
                        Aula {lesson.order}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(lesson)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(lesson.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
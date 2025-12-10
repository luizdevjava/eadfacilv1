import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Clock, Users, Award, PlayCircle, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900">EadFácil</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#sobre" className="text-slate-600 hover:text-blue-600 transition-colors">
              Sobre
            </Link>
            <Link href="#curso" className="text-slate-600 hover:text-blue-600 transition-colors">
              Curso
            </Link>
            <Link href="#professor" className="text-slate-600 hover:text-blue-600 transition-colors">
              Professor
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="outline" size="sm">
                Entrar
              </Button>
            </Link>
            <Link href="/register">
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                Cadastrar
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">
            Transforme seu
            <span className="text-blue-600"> Conhecimento</span>
            <br />
            em Cursos Online
          </h1>
          <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
            Plataforma simples e completa para professores criarem e gerenciarem seus cursos online. 
            Aulas organizadas, alunos engajados e pagamentos facilitados.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
                Começar Gratuitamente
              </Button>
            </Link>
            <Link href="#curso">
              <Button variant="outline" size="lg" className="px-8 py-3">
                Ver Demonstração
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Course Section */}
      <section id="curso" className="py-20 px-4 bg-slate-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Nosso Curso Exemplo
            </h2>
            <p className="text-lg text-slate-600">
              Conheça a estrutura completa que oferecemos para seus alunos
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Card className="overflow-hidden">
                <div className="h-48 bg-gradient-to-r from-blue-600 to-blue-700 flex items-center justify-center">
                  <PlayCircle className="w-16 h-16 text-white" />
                </div>
                <CardHeader>
                  <CardTitle className="text-2xl">Marketing Digital Completo</CardTitle>
                  <CardDescription className="text-base">
                    Domine todas as estratégias de marketing digital para alavancar seus resultados
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex items-center gap-2 text-slate-600">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">24 horas</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-600">
                      <BookOpen className="w-4 h-4" />
                      <span className="text-sm">48 aulas</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-600">
                      <Users className="w-4 h-4" />
                      <span className="text-sm">2.341 alunos</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-3xl font-bold text-slate-900">R$ 197</span>
                      <span className="text-slate-500 line-through ml-2">R$ 397</span>
                    </div>
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      Entrar no Curso
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-6">
                O que você vai aprender:
              </h3>
              <div className="space-y-4">
                {[
                  "Fundamentos de Marketing Digital",
                  "Estratégias de SEO para Google",
                  "Marketing de Conteúdo",
                  "Gestão de Redes Sociais",
                  "Tráfego Pago (Google & Facebook Ads)",
                  "Email Marketing e Automação",
                  "Análise de Dados e Métricas",
                  "Construção de Marca Pessoal"
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Recursos da Plataforma
            </h2>
            <p className="text-lg text-slate-600">
              Tudo que você precisa para criar e gerenciar seus cursos online
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="text-center p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                Aulas Organizadas
              </h3>
              <p className="text-slate-600">
                Organize seu conteúdo em módulos e aulas com ordem e progressão claras
              </p>
            </Card>

            <Card className="text-center p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                Gestão de Alunos
              </h3>
              <p className="text-slate-600">
                Controle total sobre matrículas, progresso e engajamento dos alunos
              </p>
            </Card>

            <Card className="text-center p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Award className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                Certificados
              </h3>
              <p className="text-slate-600">
                Emita certificados automáticos para alunos que concluem os cursos
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Professor Section */}
      <section id="professor" className="py-20 px-4 bg-slate-50">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="w-32 h-32 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center mb-6">
                <span className="text-4xl font-bold text-white">JD</span>
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                João da Silva
              </h2>
              <p className="text-lg text-slate-600 mb-6">
                Especialista em Marketing Digital com mais de 10 anos de experiência. 
                Já ajudei mais de 5.000 alunos a transformarem suas carreiras e negócios 
                através de estratégias digitais eficazes.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">5.000+</div>
                  <div className="text-sm text-slate-600">Alunos</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">10+</div>
                  <div className="text-sm text-slate-600">Anos de Experiência</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">98%</div>
                  <div className="text-sm text-slate-600">Satisfação</div>
                </div>
              </div>
            </div>
            <div>
              <Card className="p-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-6">
                  Por que escolher este curso?
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-slate-900">Conteúdo Atualizado</h4>
                      <p className="text-slate-600">Material sempre atualizado com as últimas tendências</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-slate-900">Suporte Contínuo</h4>
                      <p className="text-slate-600">Acompanhamento personalizado durante todo o curso</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-slate-900">Acesso Vitalício</h4>
                      <p className="text-slate-600">Acesso irrestrito ao conteúdo para sempre</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-slate-900">Certificado Reconhecido</h4>
                      <p className="text-slate-600">Certificado válido para comprovação de conhecimento</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-blue-600">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Pronto para começar?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Junte-se a milhares de professores que já transformaram seu conhecimento 
            em cursos online de sucesso com a EadFácil.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-slate-100 px-8 py-3">
                Criar Conta Gratuita
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3">
                Fazer Login
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">EadFácil</span>
              </div>
              <p className="text-slate-400">
                Plataforma completa para criação e gestão de cursos online.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Produto</h4>
              <ul className="space-y-2 text-slate-400">
                <li><Link href="#" className="hover:text-white transition-colors">Recursos</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Preços</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Cases</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Suporte</h4>
              <ul className="space-y-2 text-slate-400">
                <li><Link href="#" className="hover:text-white transition-colors">Central de Ajuda</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Contato</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Status</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-slate-400">
                <li><Link href="#" className="hover:text-white transition-colors">Termos de Uso</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Privacidade</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Cookies</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 text-center text-slate-400">
            <p>&copy; 2024 EadFácil. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
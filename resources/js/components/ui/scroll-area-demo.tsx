'use client';

import * as React from 'react';
import { Badge } from '@/components/ui/badge-2';
import { Button } from '@/components/ui/button-1';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardHeading,
  CardTitle,
  CardToolbar,
} from '@/components/ui/card-1';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Award, CheckCircle, Download, Eye, FileText, Search, Shield, Calendar } from 'lucide-react';

// Documentation data
const documents = [
  {
    id: '1',
    title: 'Professional CV',
    description: 'Comprehensive resume showcasing full-stack development experience, technical skills, and professional achievements.',
    type: 'resume',
    format: 'PDF',
    size: '2.4 MB',
    updated: '2024',
    icon: FileText,
    status: 'current',
    url: '/documents/cv.pdf',
  },
  {
    id: '2',
    title: 'Technical Portfolio',
    description: 'Detailed portfolio featuring web development projects, photography work, and case studies with live demos.',
    type: 'portfolio',
    format: 'PDF',
    size: '8.7 MB',
    updated: '2024',
    icon: FileText,
    status: 'current',
    url: '/documents/portfolio.pdf',
  },
  {
    id: '3',
    title: 'Project Documentation',
    description: 'Technical documentation for HMS and other major development projects with architecture diagrams.',
    type: 'docs',
    format: 'PDF',
    size: '1.2 MB',
    updated: '2023',
    icon: FileText,
    status: 'archived',
    url: '/docs/project-docs.pdf',
  },
  {
    id: '4',
    title: 'API Reference',
    description: 'Complete API documentation for RESTful services and GraphQL endpoints.',
    type: 'api',
    format: 'HTML',
    size: '0.8 MB',
    updated: '2023',
    icon: FileText,
    status: 'archived',
    url: '/docs/api-reference.html',
  },
];

// Certifications data
const certifications = [
  {
    id: '1',
    name: 'AWS Certified Solutions Architect',
    issuer: 'Amazon Web Services',
    year: '2023',
    credentialId: 'AWS-SAA-C03',
    status: 'active',
    icon: Shield,
    description: 'Professional level certification demonstrating expertise in designing distributed systems on AWS.',
    url: '/documents/certifications.pdf',
  },
  {
    id: '2',
    name: 'Full Stack Web Development',
    issuer: 'Meta',
    year: '2023',
    credentialId: 'META-FSWD-2023',
    status: 'active',
    icon: Award,
    description: 'Comprehensive full-stack development certification covering modern web technologies and best practices.',
    url: '/documents/certifications.pdf',
  },
  {
    id: '3',
    name: 'Professional Photography Certificate',
    issuer: 'International Photography Association',
    year: '2022',
    credentialId: 'IPA-PPC-2022',
    status: 'active',
    icon: Calendar,
    description: 'Professional photography certification covering commercial, event, and portrait photography techniques.',
    url: '/documents/certifications.pdf',
  },
  {
    id: '4',
    name: 'Project Management Professional',
    issuer: 'PMI',
    year: '2022',
    credentialId: 'PMP-2022',
    status: 'active',
    icon: Calendar,
    description: 'Project Management Professional certification demonstrating expertise in project management methodologies.',
    url: '/documents/certifications.pdf',
  },
  {
    id: '5',
    name: 'Laravel Certified Developer',
    issuer: 'Laravel',
    year: '2022',
    credentialId: 'LARAVEL-CD-2022',
    status: 'active',
    icon: CheckCircle,
    description: 'Official Laravel certification demonstrating advanced PHP framework expertise and best practices.',
    url: '/documents/certifications.pdf',
  },
  {
    id: '6',
    name: 'Vue.js Certification',
    issuer: 'Vue.js',
    year: '2021',
    credentialId: 'VUEJS-CD-2021',
    status: 'active',
    icon: CheckCircle,
    description: 'Vue.js certification covering advanced component architecture and state management patterns.',
    url: '/documents/certifications.pdf',
  },
];

export default function ScrollAreaDemo() {
  const [docsQuery, setDocsQuery] = React.useState('');
  const [certsQuery, setCertsQuery] = React.useState('');
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState<
    | { kind: 'document'; item: (typeof documents)[number] }
    | { kind: 'certification'; item: (typeof certifications)[number] }
    | null
  >(null);

  const filteredDocs = React.useMemo(() => {
    const q = docsQuery.trim().toLowerCase();
    if (!q) return documents;
    return documents.filter((doc) => {
      return (
        doc.title.toLowerCase().includes(q) ||
        doc.description.toLowerCase().includes(q) ||
        doc.type.toLowerCase().includes(q) ||
        doc.format.toLowerCase().includes(q)
      );
    });
  }, [docsQuery]);

  const filteredCerts = React.useMemo(() => {
    const q = certsQuery.trim().toLowerCase();
    if (!q) return certifications;
    return certifications.filter((cert) => {
      return (
        cert.name.toLowerCase().includes(q) ||
        cert.issuer.toLowerCase().includes(q) ||
        cert.credentialId.toLowerCase().includes(q) ||
        cert.description.toLowerCase().includes(q)
      );
    });
  }, [certsQuery]);

  const openDialogForDocument = (doc: (typeof documents)[number]) => {
    setSelectedItem({ kind: 'document', item: doc });
    setDialogOpen(true);
  };

  const openDialogForCertification = (cert: (typeof certifications)[number]) => {
    setSelectedItem({ kind: 'certification', item: cert });
    setDialogOpen(true);
  };

  return (
    <>
      <div className="grid gap-6 lg:grid-cols-2">
      {/* Documents Section */}
      <Card>
        <CardHeader>
          <CardHeading>
            <CardTitle>Documentation</CardTitle>
          </CardHeading>
          <CardToolbar>
            <div className="relative w-full max-w-[220px]">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                value={docsQuery}
                onChange={(e) => setDocsQuery(e.target.value)}
                placeholder="Search"
                className="h-8 w-full rounded-md border bg-background pl-9 pr-3 text-xs text-foreground outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              />
            </div>
          </CardToolbar>
        </CardHeader>
        <CardContent className="py-3 pe-1.5">
          <ScrollArea className="h-[400px] pe-3.5">
            {filteredDocs.map((doc) => {
              return (
                <div
                  key={doc.id}
                  className="flex items-center justify-between gap-3 py-3 border-b border-dashed last:border-none"
                >
                  {/* Left: Icon and Document Info */}
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-muted">
                      <doc.icon className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-foreground leading-tight">
                        {doc.title}
                      </h4>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                        {doc.description}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="outline" size="xs">
                          {doc.type.toUpperCase()}
                        </Badge>
                        <Badge variant="secondary" size="xs">
                          {doc.format}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {doc.size}
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* Right: Status and Download */}
                  <div className="flex flex-col items-end gap-2">
                    <Badge 
                      variant={doc.status === 'current' ? 'success' : 'secondary'} 
                      size="sm"
                    >
                      {doc.status}
                    </Badge>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" onClick={() => openDialogForDocument(doc)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <a href={doc.url} download>
                          <Download className="h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </ScrollArea>
        </CardContent>
        <CardFooter className="justify-between">
          <p className="text-xs text-muted-foreground">
            Showing {filteredDocs.length} of {documents.length}
          </p>
        </CardFooter>
      </Card>

      {/* Certifications Section */}
      <Card>
        <CardHeader>
          <CardHeading>
            <CardTitle>Certifications</CardTitle>
          </CardHeading>
          <CardToolbar>
            <div className="relative w-full max-w-[220px]">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                value={certsQuery}
                onChange={(e) => setCertsQuery(e.target.value)}
                placeholder="Search"
                className="h-8 w-full rounded-md border bg-background pl-9 pr-3 text-xs text-foreground outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              />
            </div>
          </CardToolbar>
        </CardHeader>
        <CardContent className="py-3 pe-1.5">
          <ScrollArea className="h-[400px] pe-3.5">
            {filteredCerts.map((cert) => {
              return (
                <div
                  key={cert.id}
                  className="flex items-center justify-between gap-3 py-3 border-b border-dashed last:border-none"
                >
                  {/* Left: Icon and Certification Info */}
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-muted">
                      <cert.icon className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-foreground leading-tight">
                        {cert.name}
                      </h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        {cert.issuer}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="outline" size="xs">
                          {cert.credentialId}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {cert.year}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                        {cert.description}
                      </p>
                    </div>
                  </div>
                  {/* Right: Status */}
                  <div className="flex flex-col items-end gap-2">
                    <Badge 
                      variant={cert.status === 'active' ? 'success' : 'secondary'} 
                      size="sm"
                    >
                      Active
                    </Badge>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" onClick={() => openDialogForCertification(cert)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <a href={cert.url} download>
                          <Download className="h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </ScrollArea>
        </CardContent>
        <CardFooter className="justify-between">
          <p className="text-xs text-muted-foreground">
            Showing {filteredCerts.length} of {certifications.length}
          </p>
        </CardFooter>
      </Card>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {selectedItem?.kind === 'document' ? selectedItem.item.title : selectedItem?.item.name}
            </DialogTitle>
            <DialogDescription>
              {selectedItem?.kind === 'document'
                ? selectedItem.item.description
                : selectedItem?.item.description}
            </DialogDescription>
          </DialogHeader>

          {selectedItem?.kind === 'document' ? (
            <div className="mt-4 space-y-3">
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" size="sm">
                  {selectedItem.item.type.toUpperCase()}
                </Badge>
                <Badge variant="secondary" size="sm">
                  {selectedItem.item.format}
                </Badge>
                <Badge variant={selectedItem.item.status === 'current' ? 'success' : 'secondary'} size="sm">
                  {selectedItem.item.status}
                </Badge>
              </div>
              <div className="text-sm text-muted-foreground">
                <div>Size: {selectedItem.item.size}</div>
                <div>Updated: {selectedItem.item.updated}</div>
              </div>
            </div>
          ) : selectedItem?.kind === 'certification' ? (
            <div className="mt-4 space-y-3">
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" size="sm">
                  {selectedItem.item.credentialId}
                </Badge>
                <Badge variant="secondary" size="sm">
                  {selectedItem.item.year}
                </Badge>
                <Badge variant={selectedItem.item.status === 'active' ? 'success' : 'secondary'} size="sm">
                  {selectedItem.item.status}
                </Badge>
              </div>
              <div className="text-sm text-muted-foreground">
                <div>Issuer: {selectedItem.item.issuer}</div>
              </div>
            </div>
          ) : null}

          <DialogFooter className="mt-6">
            {selectedItem?.item?.url ? (
              <>
                <Button variant="outline" asChild>
                  <a href={selectedItem.item.url} target="_blank" rel="noreferrer">
                    Open
                  </a>
                </Button>
                <Button variant="primary" asChild>
                  <a href={selectedItem.item.url} download>
                    Download
                  </a>
                </Button>
              </>
            ) : null}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

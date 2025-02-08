"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Folder,
  File,
  Upload,
  Search,
  Menu,
  ChevronRight,
  Home,
} from "lucide-react";

type FileType = {
  id: string;
  name: string;
  type: "folder" | "file";
  size?: string;
  modified: string;
  url?: string;
  path: string[];
};

const mockFiles: FileType[] = [
  {
    id: "1",
    name: "Documents",
    type: "folder",
    modified: "2023-05-10",
    path: ["My Drive"],
  },
  {
    id: "2",
    name: "Images",
    type: "folder",
    modified: "2023-05-09",
    path: ["My Drive"],
  },
  {
    id: "3",
    name: "report.pdf",
    type: "file",
    size: "2.5 MB",
    modified: "2023-05-08",
    url: "https://example.com/report.pdf",
    path: ["My Drive"],
  },
  {
    id: "4",
    name: "presentation.pptx",
    type: "file",
    size: "5.1 MB",
    modified: "2023-05-07",
    url: "https://example.com/presentation.pptx",
    path: ["My Drive"],
  },
  {
    id: "5",
    name: "budget.xlsx",
    type: "file",
    size: "1.2 MB",
    modified: "2023-05-06",
    url: "https://example.com/budget.xlsx",
    path: ["My Drive"],
  },
];

export function DriveUI() {
  const [files, setFiles] = useState<FileType[]>(mockFiles);
  const [currentPath, setCurrentPath] = useState<string[]>(["My Drive"]);

  const handleNavigate = (index: number) => {
    setCurrentPath(currentPath.slice(0, index + 1));
  };

  const handleUpload = () => {
    // Simulating file upload
    const newFile: FileType = {
      id: `${files.length + 1}`,
      name: `New File ${files.length + 1}.txt`,
      type: "file",
      size: "0.1 MB",
      modified: new Date().toISOString().split("T")[0],
      url: `https://example.com/new-file-${files.length + 1}.txt`,
      path: [...currentPath],
    };
    setFiles([...files, newFile]);
  };

  return (
    <div className="flex h-screen bg-gray-900 text-gray-100">
      <aside className="w-64 bg-gray-800 p-4">
        <h1 className="text-2xl font-bold mb-4">B-Drive</h1>
        <Button onClick={handleUpload} className="w-full mb-4">
          <Upload className="mr-2 h-4 w-4" /> Upload
        </Button>
        <nav>
          <Button variant="ghost" className="w-full justify-start mb-2">
            <Folder className="mr-2 h-4 w-4" /> My Drive
          </Button>
          <Button variant="ghost" className="w-full justify-start mb-2">
            <File className="mr-2 h-4 w-4" /> Recent
          </Button>
        </nav>
      </aside>
      <main className="flex-1 p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
            <Input placeholder="Search in Drive" className="pl-8 bg-gray-800" />
          </div>
          <Button variant="ghost" size="icon">
            <Menu className="h-4 w-4" />
          </Button>
        </div>
        <nav className="flex mb-4" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Button
                variant="ghost"
                onClick={() => handleNavigate(0)}
                className="inline-flex items-center text-sm font-medium"
              >
                <Home className="w-4 h-4 mr-2" />
                My Drive
              </Button>
            </li>
            {currentPath.slice(1).map((item, index) => (
              <li key={index}>
                <div className="flex items-center">
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                  <Button
                    variant="ghost"
                    onClick={() => handleNavigate(index + 1)}
                    className="ml-1 text-sm font-medium md:ml-2"
                  >
                    {item}
                  </Button>
                </div>
              </li>
            ))}
          </ol>
        </nav>
        <ScrollArea className="h-[calc(100vh-8rem)]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {files
              .filter(
                (file) =>
                  JSON.stringify(file.path) === JSON.stringify(currentPath)
              )
              .map((file) => (
                <div
                  key={file.id}
                  className="bg-gray-800 p-4 rounded-lg cursor-pointer"
                  onClick={() =>
                    file.type === "folder" &&
                    setCurrentPath([...currentPath, file.name])
                  }
                >
                  {file.type === "folder" ? (
                    <Folder className="h-12 w-12 mb-2" />
                  ) : (
                    <File className="h-12 w-12 mb-2" />
                  )}
                  <h3 className="font-semibold mb-1">
                    {file.type === "file" && file.url ? (
                      <Link
                        href={file.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        {file.name}
                      </Link>
                    ) : (
                      file.name
                    )}
                  </h3>
                  <p className="text-sm text-gray-400">{file.size || "—"}</p>
                  <p className="text-sm text-gray-400">
                    Modified: {file.modified}
                  </p>
                </div>
              ))}
          </div>
        </ScrollArea>
      </main>
    </div>
  );
}

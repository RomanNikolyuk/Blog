<!DOCTYPE html>
<html data-cbscriptallow="true" lang="en"><head>
    <meta http-equiv="content-type" content="text/html; charset=UTF-8">
    <title>Simple Blog | Created by Roman Nikolyuk</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link href="{{ asset('css/css.css') }}" rel="stylesheet">
    <link rel="stylesheet" href="{{ asset('css/A.css') }}">
<body>

<div class="wrap">
    <header role="banner">
        <div class="top-bar">
            <div class="container">
                <div class="row">
                    <div class="col-12 social">
                        <a href="https://www.instagram.com/vl_st__/"><span class="fa fa-instagram"></span></a>
                        <a href="https://t.me/vl_st1"><span class="fa fa-telegram"></span></a>
                    </div>
                </div>
            </div>
        </div>
        <div class="container logo-wrap">
            <div class="row pt-5">
                <div class="col-12 text-center">
                    <a class="absolute-toggle d-block d-md-none" data-toggle="collapse" href="#navbarMenu" role="button"
                       aria-expanded="false" aria-controls="navbarMenu"><span class="burger-lines"></span></a>
                    <h1 class="site-logo"><a href="https://preview.colorlib.com/theme/wordify/index.html">Blog</a></h1>
                </div>
            </div>
        </div>
        <nav class="navbar navbar-expand-md  navbar-light bg-light">
            <div class="container">
                <div class="collapse navbar-collapse" id="navbarMenu">
                    <ul class="navbar-nav mx-auto">
                        <li class="nav-item ">
                            <a class="nav-link {{ Request::routeIs('index') ? 'active' : '' }}"
                               href="{{ route('index') }}">Home</a>
                        </li>

                        <li class="nav-item">
                            <a class="nav-link {{ (Request::routeIs('article.index') || Request::routeIs('article.view')) ? 'active' : '' }}" href="{{ route('article.index') }}">Articles</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </header>